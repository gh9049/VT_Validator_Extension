// 1. Load saved settings when the popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    useVT: true,
    useAbuseIPDB: true,
    usePaloAlto: true
  }, (prefs) => {
    document.getElementById('vt').checked = prefs.useVT;
    document.getElementById('abuse').checked = prefs.useAbuseIPDB;
    document.getElementById('palo').checked = prefs.usePaloAlto;
  });
});

// 2. Save settings whenever a checkbox is toggled
document.getElementById('vt').addEventListener('change', (e) => {
  chrome.storage.sync.set({ useVT: e.target.checked });
});

document.getElementById('abuse').addEventListener('change', (e) => {
  chrome.storage.sync.set({ useAbuseIPDB: e.target.checked });
});

document.getElementById('palo').addEventListener('change', (e) => {
  chrome.storage.sync.set({ usePaloAlto: e.target.checked });
});