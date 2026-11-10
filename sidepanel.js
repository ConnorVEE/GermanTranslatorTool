async function loadCapturedData() {
    // Fetch data from Chrome storage
    const data = await chrome.storage.local.get(["lastQuery", "lastContext"]);
    
    if (data.lastQuery) {
      document.getElementById("highlighted-display").innerText = data.lastQuery;
    }
    if (data.lastContext) {
      document.getElementById("context-display").innerText = data.lastContext;
    }
  }
  
  // Load data when the side panel opens
  document.addEventListener("DOMContentLoaded", loadCapturedData);
  
  // Optional: Listen in real-time if the user highlights something else while the panel is open
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local") {
      if (changes.lastQuery) {
        document.getElementById("highlighted-display").innerText = changes.lastQuery.newValue;
      }
      if (changes.lastContext) {
        document.getElementById("context-display").innerText = changes.lastContext.newValue;
      }
    }
  });