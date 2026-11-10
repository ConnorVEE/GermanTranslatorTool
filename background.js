// Custom context menu for text selection
chrome.runtime.onInstalled.addListener(() => {
  // Set the side panel to open when the icon is clicked
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  // Create a parent or individual options for text selection
  chrome.contextMenus.create({
    id: "german-definition",
    title: "Get Definition",
    contexts: ["selection"] // This ensures it ONLY appears when text is highlighted
  });

  chrome.contextMenus.create({
    id: "german-explanation",
    title: "Get Explanation",
    contexts: ["selection"]
  });
});

  // 2. Listen for when a user clicks your menu item
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "german-definition" || info.menuItemId === "german-explanation") {
    
    // Send a message to the content script running on the current tab
    chrome.tabs.sendMessage(tab.id, { action: info.menuItemId }, async (response) => {
      if (response && response.highlightedText) {
        
        // Store the data temporarily using Chrome's local storage
        await chrome.storage.local.set({ 
          lastQuery: response.highlightedText,
          lastContext: response.context,
          actionType: info.menuItemId
        });
        
      }
    });    
  }
});

  // chrome.contextMenus.onClicked.addListener((info, tab) => {
  //   if (info.menuItemId === "german-definition" || info.menuItemId === "german-explanation") {
  //     // info.selectionText gives you the exact text the user highlighted!
  //     console.log("User selected:", info.selectionText);
  //     console.log("Action chosen:", info.menuItemId);
      
  //     // Here is where we would trigger communication with your content script / side panel
  //   }
  // });