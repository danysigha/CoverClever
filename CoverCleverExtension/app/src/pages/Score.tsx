import { useState } from "react";
import "../styles/Score.css"; 
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Typography, Box, IconButton } from '@mui/material';



const FileUpload: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Handle the drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = e.dataTransfer.files;
    setFiles([...files, ...Array.from(newFiles)]);
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      setFiles([...files, ...Array.from(newFiles)]);
    }
  };

  // Handle file upload (simulate it)
  const handleUpload = () => {
    if (files.length === 0) {
      alert('No files selected!');
      return;
    }
    // You can replace this with an actual upload to a server or API.
    alert('Files ready for upload: ' + files.map((file) => file.name).join(', '));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" gap={4} marginTop={5} marginBottom={2}>
        <div
          style={{
            border: dragging ? '2px solid #4CAF50' : '2px dashed #ccc',
            padding: '20px',
            width: '220px',
            textAlign: 'center',
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>{dragging ? 'Release to upload files' : 'Drag files here to upload'}</p>
        </div>

        <div>
          <div>
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ display: 'block', marginTop: '10px', cursor: 'pointer' }}>
              Or select files
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleUpload} style={{ padding: '10px 15px', cursor: 'pointer' }}>
              Upload
            </button>
          </div>
        </div>
      </Box>
      <div>
        {files.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Selected Files:</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </>
  );
};


const Score = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle adding policy
  const handleAddPolicy = () => {
    alert('Policy added!');
      return;
  };

  const handleScrape = () => {
    setLoading(true);
    setData(null);
    setError(null);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage({ action: "start", url: tabs[0].url }, (response) => {
          console.log(response.status);
        });
    });

    chrome.runtime.sendMessage({ action: "start" }, (startResponse) => {
      if (chrome.runtime.lastError) {
        console.error("Chrome runtime error:", chrome.runtime.lastError.message);
        setError("Error starting scrape.");
        setLoading(false);
        return;
      }
      
      console.log("Start response:", startResponse);

      chrome.runtime.sendMessage({ action: "scrapeData" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Chrome runtime error:", chrome.runtime.lastError.message);
          setError("Error fetching data.");
        } else if (response && response.data) {
          setData(response.data);
          console.log("Received data from background:", response.data);
        } else {
          console.error("No response or data unavailable. Checking local storage...");

          // Check local storage as fallback
          chrome.storage.local.get("scrapedData", (result) => {
            if (result.scrapedData) {
              setData(result.scrapedData);
              console.log("Retrieved from local storage:", result.scrapedData);
            } else {
              setError("No data available.");
            }
          });
        }
        setLoading(false);
      });

    });
  };

  return (
      <div className="score-container">

        <h1 className="page-title">Add a new policy</h1>

        <div className="content-container">
          <div className="instructions">
            <h2>Instructions</h2>
            <ol>
              <li>Navigate to <a href="https://www.bluecrossma.org/" target="_blank">BCBS</a></li>
              <li>Enter your credentials and Sign in</li>
              <li>Open the Cover Clever browser extension, select the "Add a health insurance" menu item, then press the "start scraping" icon.</li>
              <li>(Optional) Upload your insurance benefits description. You can do either steps 3, 4, or both.</li>
            </ol>
          </div>

          
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <IconButton
              onClick={handleScrape}
              disabled={loading}
              color="inherit"
              aria-label="start scraping Blue Cross Blue Shield Web application"
            >
              <DocumentScannerIcon sx={{ fontSize: 70 }} />
            </IconButton>
            <Typography variant="body1">
              {loading ? "Loading..." : "Start Scraping"}
            </Typography>
          </Box>
          
          <FileUpload />
          {/* <div style={{ overflowX: "hidden" }}>
            <FileUpload />
          </div> */}
          
          <div style={{ textAlign: "center", margin: "1em" }}>
            <button
              onClick={handleAddPolicy}
              style={{
                alignItems: "center",
                marginTop: "1.5em",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              Add Insurance Policy
            </button>
          </div>

    
          {loading && <p className="mt-6 text-xl text-gray-600">Loading...</p>}
          {error && <p className="mt-6 text-xl text-red-500">{error}</p>}
          {data && (
            <pre className="mt-6 bg-gray-100 p-6 rounded-lg text-lg w-full max-w-3xl overflow-auto">
              {data}
            </pre>
          )}
        </div>
      </div>
    
  );
}

export default Score;
