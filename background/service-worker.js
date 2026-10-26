// Service Worker de C13 Versión Móvil

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-mobile-view') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) return;
    const saved = await chrome.storage.local.get(['selectedDevice']);
    activateSimulatorInTab(tab.id, saved.selectedDevice || 'iphone-16-pro', false);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ACTIVATE_MOBILE_SIMULATOR') {
    activateSimulatorInTab(message.tabId, message.deviceId, message.dualMode);
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === 'CAPTURE_MOCKUP_TAB') {
    const winId = sender.tab ? sender.tab.windowId : chrome.windows.WINDOW_ID_CURRENT;
    chrome.tabs.captureVisibleTab(winId, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        sendResponse({ error: chrome.runtime.lastError?.message || 'No se pudo capturar el mockup' });
      } else {
        sendResponse({ dataUrl });
      }
    });
    return true;
  }

  if (message.type === 'DOWNLOAD_MOCKUP_PNG') {
    chrome.downloads.download({
      url: message.dataUrl,
      filename: message.filename || 'c13-version-movil-mockup.png',
      saveAs: false
    });
    sendResponse({ ok: true });
    return true;
  }
});

async function activateSimulatorInTab(tabId, deviceId, dualMode) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content/simulator.js']
    });
    await chrome.tabs.sendMessage(tabId, {
      type: 'INIT_C13_SIMULATOR',
      deviceId: deviceId || 'iphone-16-pro',
      dualMode: Boolean(dualMode)
    });
  } catch (err) {
    console.error('No se pudo iniciar C13 Versión Móvil en esta pestaña:', err);
  }
}
