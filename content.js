chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "german-explanation" || request.action === "german-definition") {
      const selection = window.getSelection();
      
      if (!selection.isCollapsed && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const highlightedText = selection.toString().trim();
        
        // Find the parent paragraph context
        let container = range.commonAncestorContainer;
        if (container.nodeType === Node.TEXT_NODE) {
          container = container.parentElement;
        }
        
        const paragraphElement = container.closest('p, article, section') || container;
        const context = paragraphElement ? paragraphElement.innerText : "";
  
        // Send the packaged data back to the background script
        sendResponse({ 
          highlightedText: highlightedText, 
          context: context 
        });
      } else {
        sendResponse({ highlightedText: "", context: "" });
      }
    }
    
    // Return true to indicate you want to send a response asynchronously if needed
    return true;
  });