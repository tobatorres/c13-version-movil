document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reload-ext-btn')?.addEventListener('click', () => {
    chrome.runtime.reload();
  });

  document.getElementById('btn-launch-default').addEventListener('click', () => {
    launchSimulator('iphone-16-pro', false);
  });

  document.querySelectorAll('.device-card').forEach((card) => {
    card.addEventListener('click', () => {
      const dev = card.dataset.device;
      if (dev === 'dual-mode') {
        launchSimulator('iphone-16-pro', true);
      } else {
        launchSimulator(dev, false);
      }
    });
  });
});

async function launchSimulator(deviceId, dualMode) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.includes('chrome.google.com/webstore') || tab.url.includes('chromewebstore.google.com')) {
    const banner = document.getElementById('status-msg');
    banner.textContent = 'Por seguridad de Chrome, abre cualquier web normal (ej. eticonsa.es o un periódico) para activar el simulador móvil.';
    banner.classList.remove('hidden');
    return;
  }

  await chrome.storage.local.set({
    selectedDevice: deviceId,
    dualMode: Boolean(dualMode)
  });

  chrome.runtime.sendMessage({
    type: 'ACTIVATE_MOBILE_SIMULATOR',
    tabId: tab.id,
    windowId: tab.windowId,
    deviceId,
    dualMode: Boolean(dualMode)
  });

  window.close();
}
