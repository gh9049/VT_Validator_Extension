// 1. Create a single context menu item on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "osint-scan-all",
    title: "OSNIT THIS",
    contexts: ["selection"]
  });
});

// 2. Handle the click
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "osint-scan-all") {
    const input = info.selectionText ? info.selectionText.trim() : "";
    if (!input) return;

    // Check which tools are enabled in settings
    chrome.storage.sync.get({
      useVT: true,
      useAbuseIPDB: true,
      usePaloAlto: true
    }, (prefs) => {
      
      // Open VirusTotal if enabled
      if (prefs.useVT) {
        chrome.tabs.create({ 
          url: `https://www.virustotal.com/gui/search/${encodeURIComponent(input)}`, 
          active: false // Open in background so you don't lose focus immediately
        });
      }

      // Open AbuseIPDB if enabled
      if (prefs.useAbuseIPDB) {
        chrome.tabs.create({ 
          url: `https://www.abuseipdb.com/check/${encodeURIComponent(input)}`, 
          active: false 
        });
      }

      // Open Palo Alto if enabled
      if (prefs.usePaloAlto) {
        chrome.tabs.create({ 
          url: `https://urlfiltering.paloaltonetworks.com/query/?q=${encodeURIComponent(input)}`, 
          active: false 
        });
      }
      
    });
  }
});