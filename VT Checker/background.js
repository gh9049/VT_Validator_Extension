chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "vtSearchLink",
    title: "Search on VirusTotal",
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "vtSearchText",
    title: "Search on VirusTotal",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  let input = "";

  if (info.menuItemId === "vtSearchLink") {
    input = info.linkUrl;
  } else if (info.menuItemId === "vtSearchText") {
    input = info.selectionText.trim();
  }

  if (input) {
    const vtUrl = `https://www.virustotal.com/gui/search/${encodeURIComponent(input)}`;
    chrome.tabs.create({ url: vtUrl });
  }
});
