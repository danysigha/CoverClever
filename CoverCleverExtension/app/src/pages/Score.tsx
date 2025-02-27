import { useState } from "react";
import "../styles/Score.css"; 

const Score = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center min-h-screen -mt-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Add a new policy</h1>
        <button
          onClick={handleScrape}
          disabled={loading}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors duration-200 min-w-[200px]"
        >
          {loading ? "Loading..." : "Start Scraping"}
        </button>
  
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




// In your background.js or popup.js file

