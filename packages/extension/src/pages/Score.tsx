import { useState } from "react";
import "../styles/Score.css"; 
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Typography, Box, IconButton } from '@mui/material';


/**
 * FileUpload component that allows users to upload files via drag and drop or file selection.
 * 
 * @returns {JSX.Element} The FileUpload component
 */
const FileUpload: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  /**
   * Handles the drag enter event by preventing default behavior and setting dragging state to true.
   * 
   * @param {React.DragEvent} e - The drag enter event
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  /**
   * Handles the drag leave event by preventing default behavior and setting dragging state to false.
   * 
   * @param {React.DragEvent} e - The drag leave event
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  /**
   * Handles the drag over event by preventing default behavior.
   * 
   * @param {React.DragEvent} e - The drag over event
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  /**
   * Handles the drop event by adding the dropped files to the state.
   * 
   * @param {React.DragEvent} e - The drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = e.dataTransfer.files;
    setFiles([...files, ...Array.from(newFiles)]);
  };

  /**
   * Handles file selection from the file input by adding the selected files to the state.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      setFiles([...files, ...Array.from(newFiles)]);
    }
  };

  /**
   * Simulates file upload by showing an alert with the selected file names.
   * In a real application, this would send the files to a server or API.
   */
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
        <Box
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
          <Typography variant="body1">{dragging ? 'Release to upload files' : 'Drag files here to upload'}</Typography>
        </Box>

        <Box>
          <Box>
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ display: 'block', marginTop: '10px', cursor: 'pointer' }}>
              <Typography variant="body1">Or select files</Typography>
            </label>
          </Box>
          <Box style={{ marginTop: '10px' }}>
            <button onClick={handleUpload} style={{ padding: '10px 15px', cursor: 'pointer' }}>
              Upload
            </button>
          </Box>
        </Box>
      </Box>
      <Box>
        {files.length > 0 && (
            <Box style={{ marginTop: '20px' }}>
              <h3>Selected Files:</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}
      </Box>
    </>
  );
};

/**
 * Score component that provides functionality for adding insurance policies
 * through file upload or web scraping.
 * 
 * @returns {JSX.Element} The Score component
 */
const Score = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles adding a policy by showing an alert (placeholder functionality).
   */
  const handleAddPolicy = () => {
    alert('Policy added!');
      return;
  };

  /**
   * Initiates the web scraping process by sending messages to the Chrome extension.
   * Sets loading state while waiting for the response and handles any errors.
   */
  const handleScrape = () => {
    setLoading(true);
    setData(null);
    setError(null);

    /**
     * Query for the active tab and send a start message with the URL.
     */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage({ action: "start", url: tabs[0].url }, (response) => {
          console.log(response.status);
        });
    });

    /**
     * Send a message to start the scraping process and handle the response.
     */
    chrome.runtime.sendMessage({ action: "start" }, (startResponse) => {
      if (chrome.runtime.lastError) {
        console.error("Chrome runtime error:", chrome.runtime.lastError.message);
        setError("Error starting scrape.");
        setLoading(false);
        return;
      }
      
      console.log("Start response:", startResponse);

      /**
       * Request the scraped data from the extension's background script.
       * Falls back to checking local storage if the message response fails.
       */
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
      <Box className="score-container">

        <Typography className="page-title" sx={{fontSize: "2em", fontWeight: "900", marginBottom: "0.5rem"}}>Add a new policy</Typography>

        <Box className="content-container">
          <Box className="instructions">
            <Typography variant="h2">Instructions</Typography>
            <ol>
              <li><Typography variant="body1">Navigate to <a href="https://www.bluecrossma.org/" target="_blank">BCBS</a></Typography></li>
              <li><Typography variant="body1">Enter your credentials and Sign in</Typography></li>
              <li><Typography variant="body1">Open the Cover Clever browser extension, select the "Add a health insurance" menu item, then press the "start scraping" icon.</Typography></li>
              <li><Typography variant="body1">(Optional) Upload your insurance benefits description. You can do either steps 3, 4, or both.</Typography></li>
            </ol>
          </Box>

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
          
          <Box style={{ textAlign: "center", margin: "1em" }}>
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
          </Box>

          {loading && <p className="mt-6 text-xl text-gray-600">Loading...</p>}
          {error && <p className="mt-6 text-xl text-red-500">{error}</p>}
          {data && (
            <pre className="mt-6 bg-gray-100 p-6 rounded-lg text-lg w-full max-w-3xl overflow-auto">
              {data}
            </pre>
          )}
        </Box>
      </Box>
    
  );
}

export default Score;
