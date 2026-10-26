// C13 Versión Móvil — Motor de Simulación Responsive y Mockups Pro (Shadow DOM aislado)

(function () {
  const DEVICES = [
    // APPLE IPHONES (INCLUYE NUEVO IPHONE DUO CERRADO 5.4" Y DESPLEGADO 7.6")
    { id: 'iphone-duo-closed', name: 'iPhone DUO (Cerrado 5.4")', brand: 'apple', width: 420, height: 588, radius: 38, cutout: 'duo-closed', frameColor: '#18181b', tag: '8.4×11.8cm' },
    { id: 'iphone-duo', name: 'iPhone DUO (Abierto 7.6")', brand: 'apple', width: 824, height: 588, radius: 38, cutout: 'duo-open', frameColor: '#18181b', tag: '16.5×11.8cm' },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', brand: 'apple', width: 440, height: 956, radius: 54, cutout: 'island', frameColor: '#1c1917', tag: 'Nuevo' },
    { id: 'iphone-17-air', name: 'iPhone 17 Air', brand: 'apple', width: 393, height: 852, radius: 50, cutout: 'island', frameColor: '#334155', tag: 'Air' },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', brand: 'apple', width: 430, height: 932, radius: 54, cutout: 'island', frameColor: '#27272a', tag: 'iOS' },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', brand: 'apple', width: 393, height: 852, radius: 50, cutout: 'island', frameColor: '#1e1b18', tag: 'iOS' },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', brand: 'apple', width: 430, height: 932, radius: 52, cutout: 'island', frameColor: '#1e293b', tag: 'iOS' },
    { id: 'iphone-16', name: 'iPhone 16', brand: 'apple', width: 393, height: 852, radius: 48, cutout: 'island', frameColor: '#1e293b', tag: 'iOS' },
    { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', brand: 'apple', width: 430, height: 932, radius: 52, cutout: 'island', frameColor: '#3f3f46', tag: 'Titanio' },
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro', brand: 'apple', width: 393, height: 852, radius: 48, cutout: 'island', frameColor: '#3f3f46', tag: 'Titanio' },
    { id: 'iphone-14-pro', name: 'iPhone 14 Pro', brand: 'apple', width: 393, height: 852, radius: 48, cutout: 'island', frameColor: '#312e81', tag: 'Pro' },
    { id: 'iphone-se', name: 'iPhone SE', brand: 'apple', width: 375, height: 667, radius: 34, cutout: 'classic', frameColor: '#18181b', tag: '4.7"' },

    // ANDROID PHONES
    { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', brand: 'android', width: 412, height: 915, radius: 18, cutout: 'hole', frameColor: '#27272a', tag: 'Ultra' },
    { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', brand: 'android', width: 412, height: 915, radius: 14, cutout: 'hole', frameColor: '#3f3f46', tag: 'Ultra' },
    { id: 'galaxy-s24', name: 'Galaxy S24', brand: 'android', width: 360, height: 780, radius: 38, cutout: 'hole', frameColor: '#1e293b', tag: 'Android' },
    { id: 'pixel-9-pro-xl', name: 'Google Pixel 9 Pro XL', brand: 'android', width: 412, height: 915, radius: 44, cutout: 'hole', frameColor: '#27272a', tag: 'Pixel' },
    { id: 'pixel-9-pro', name: 'Google Pixel 9 Pro', brand: 'android', width: 412, height: 892, radius: 44, cutout: 'hole', frameColor: '#27272a', tag: 'Pixel' },
    { id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', brand: 'android', width: 393, height: 873, radius: 40, cutout: 'hole', frameColor: '#18181b', tag: 'Leica' },
    { id: 'oneplus-12', name: 'OnePlus 12', brand: 'android', width: 412, height: 915, radius: 38, cutout: 'hole', frameColor: '#064e3b', tag: '5G' },
    { id: 'galaxy-z-flip-6', name: 'Galaxy Z Flip 6', brand: 'android', width: 384, height: 880, radius: 36, cutout: 'hole', frameColor: '#312e81', tag: 'Flip' },

    // FOLDABLES & TABLETS
    { id: 'iphone-duo-open', name: 'iPhone DUO (7.6" Abierto)', brand: 'tablet', width: 824, height: 588, radius: 38, cutout: 'duo-open', frameColor: '#18181b', tag: '16.5×11.8cm' },
    { id: 'galaxy-z-fold-6', name: 'Galaxy Z Fold 6', brand: 'tablet', width: 690, height: 828, radius: 26, cutout: 'duo-open', frameColor: '#18181b', tag: 'Plegable' },
    { id: 'pixel-9-fold', name: 'Pixel 9 Pro Fold', brand: 'tablet', width: 720, height: 768, radius: 28, cutout: 'duo', frameColor: '#27272a', tag: 'Plegable' },
    { id: 'ipad-mini', name: 'iPad Mini (6ª Gen)', brand: 'tablet', width: 768, height: 1024, radius: 32, cutout: 'tablet', frameColor: '#27272a', tag: '8.3"' },
    { id: 'ipad-pro-11', name: 'iPad Air / Pro 11"', brand: 'tablet', width: 820, height: 1180, radius: 34, cutout: 'tablet', frameColor: '#1e293b', tag: 'M2/M4' },
    { id: 'ipad-pro-13', name: 'iPad Pro 13" M4', brand: 'tablet', width: 1024, height: 1366, radius: 36, cutout: 'tablet', frameColor: '#18181b', tag: '13"' },
    { id: 'galaxy-tab-s9', name: 'Galaxy Tab S9', brand: 'tablet', width: 800, height: 1280, radius: 28, cutout: 'tablet', frameColor: '#27272a', tag: 'Tablet' }
  ];

  if (window.__c13MobileMessageListener) {
    chrome.runtime.onMessage.removeListener(window.__c13MobileMessageListener);
  }

  window.__c13MobileMessageListener = (msg, sender, sendResponse) => {
    if (msg.type === 'INIT_C13_SIMULATOR') {
      mountOrUpdateSimulator(msg.deviceId || 'iphone-16-pro', Boolean(msg.dualMode));
      sendResponse({ ok: true });
      return true;
    }
  };
  chrome.runtime.onMessage.addListener(window.__c13MobileMessageListener);

  function getDeviceById(id) {
    return DEVICES.find((d) => d.id === id) || DEVICES[1];
  }

  function mountOrUpdateSimulator(initialDeviceId, initialDualMode) {
    // Si ya está abierto, actualizar o alternar
    const existingHost = document.getElementById('__c13-version-movil-host');
    if (existingHost) {
      existingHost.remove();
      document.documentElement.style.overflow = window.__c13PrevOverflow || '';
    }

    window.__c13PrevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const state = {
      activeSlot: 0,
      slots: [
        { deviceId: initialDeviceId || 'iphone-16-pro', landscape: false },
        { deviceId: 'galaxy-s25-ultra', landscape: false }
      ],
      dualMode: Boolean(initialDualMode),
      showBrowserBar: true,
      bgTheme: 'light', // 'light' | 'dark' | 'gradient'
      sidebarOpen: true,
      currentUrl: window.location.href
    };

    const host = document.createElement('div');
    host.id = '__c13-version-movil-host';
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:block;';
    const shadow = host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif; }
      .sim-root {
        position: fixed; inset: 0;
        display: flex; flex-direction: column;
        transition: background 0.25s ease;
        user-select: none;
      }
      .sim-root.theme-light { background: #f8fafc; color: #0f172a; }
      .sim-root.theme-dark { background: #0b1120; color: #f8fafc; }
      .sim-root.theme-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%); color: #f8fafc; }

      /* TOP CONTROLS FLOATING BAR */
      .top-hud {
        position: fixed; top: 16px; left: 20px; z-index: 40;
        display: flex; align-items: center; gap: 8px;
        background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(10px);
        border: 1px solid #334155; padding: 7px 12px; border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.22); color: #f8fafc;
      }
      .brand-tag {
        display: flex; align-items: center; gap: 7px;
        font-size: 13px; font-weight: 800; padding-right: 8px;
        border-right: 1px solid #334155;
      }
      .brand-dot {
        width: 24px; height: 24px; border-radius: 7px;
        background: linear-gradient(135deg, #0ea5e9, #6366f1);
        display: flex; align-items: center; justify-content: center; font-size: 13px;
      }
      .hud-btn {
        background: #1e293b; border: 1px solid #334155; color: #e2e8f0;
        padding: 6px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;
        cursor: pointer; display: flex; align-items: center; gap: 5px;
        transition: all 0.15s;
      }
      .hud-btn:hover { background: #334155; border-color: #0ea5e9; color: #fff; }
      .hud-btn.active { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }
      .hud-btn.capture { background: linear-gradient(135deg, #10b981, #059669); border-color: #10b981; color: #fff; font-weight: 700; }
      .hud-btn.record { background: linear-gradient(135deg, #ef4444, #dc2626); border-color: #ef4444; color: #fff; font-weight: 700; }
      .hud-btn.record.recording { animation: c13pulse 1.2s infinite; background: #b91c1c; }
      @keyframes c13pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

      /* CLOSE & SIDEBAR TOGGLE AT TOP RIGHT */
      .corner-controls {
        position: fixed; top: 14px; right: 16px; z-index: 50;
        display: flex; flex-direction: column; gap: 8px; align-items: flex-end;
      }
      .round-btn {
        width: 34px; height: 34px; border-radius: 9px;
        background: #0f172a; color: #f8fafc; border: 1px solid #334155;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        font-size: 15px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.15s;
      }
      .round-btn:hover { background: #ef4444; border-color: #ef4444; color: #fff; }
      .round-btn.panel-toggle { background: #0ea5e9; border-color: #0ea5e9; }
      .round-btn.panel-toggle:hover { background: #0284c7; }

      /* STAGE AREA */
      .stage-area {
        flex: 1; display: flex; align-items: center; justify-content: center;
        gap: 36px; padding: 68px 370px 28px 28px;
        height: 100vh; overflow: hidden;
        transition: padding-right 0.25s ease;
      }
      .stage-area.full-width { padding-right: 28px; }

      /* DEVICE HARDWARE SHELL */
      .device-wrapper {
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        position: relative;
      }
      .device-label-pill {
        background: rgba(15, 23, 42, 0.85); color: #f8fafc;
        padding: 4px 12px; border-radius: 99px; font-size: 11.5px; font-weight: 700;
        border: 1px solid rgba(148, 163, 184, 0.3);
        display: flex; align-items: center; gap: 8px;
      }
      .device-wrapper.selected-slot .device-label-pill {
        border-color: #0ea5e9; box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
      }

      .hardware-shell {
        position: relative;
        background: #18181b;
        padding: 13px;
        box-shadow:
          0 0 0 2px #52525b,
          0 0 0 4px #27272a,
          0 25px 60px rgba(0, 0, 0, 0.42);
        transition: width 0.25s ease, height 0.25s ease, border-radius 0.25s ease;
        display: flex; flex-direction: column;
      }
      /* Botones físicos laterales */
      .hardware-shell::before {
        content: ''; position: absolute; left: -6px; top: 110px;
        width: 3px; height: 55px; background: #3f3f46; border-radius: 3px 0 0 3px;
        box-shadow: 0 70px 0 #3f3f46;
      }
      .hardware-shell::after {
        content: ''; position: absolute; right: -6px; top: 140px;
        width: 3px; height: 75px; background: #3f3f46; border-radius: 0 3px 3px 0;
      }

      /* Pliegue sutil horizontal para modelos Flip cuando están abiertos */
      .fold-crease-h {
        position: absolute; left: 0; right: 0; top: 50%; height: 2px;
        background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,0,0,0.12), rgba(255,255,255,0.05));
        pointer-events: none; z-index: 9;
      }
      /* Bisagra / Pliegue central vertical realista para dispositivos DUO / Fold */
      .duo-hinge-line {
        position: absolute; top: 0; bottom: 0; left: 50%; width: 10px;
        transform: translateX(-50%);
        background: linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(255,255,255,0.22) 50%, rgba(0,0,0,0.18) 100%);
        pointer-events: none; z-index: 15;
      }
      .screen-bezel {
        position: relative; width: 100%; height: 100%;
        background: #ffffff; overflow: hidden;
        display: flex; flex-direction: column;
      }

      /* STATUS BAR SUPERIOR REALISTA */
      .status-bar {
        height: 36px; background: #ffffff; color: #0f172a;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 22px; font-size: 12px; font-weight: 700;
        position: relative; z-index: 10; flex-shrink: 0;
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }
      .cutout-island {
        position: absolute; left: 50%; top: 7px; transform: translateX(-50%);
        width: 96px; height: 23px; background: #000; border-radius: 99px;
        display: flex; align-items: center; justify-content: flex-end; padding-right: 8px;
      }
      .cutout-island::after {
        content: ''; width: 8px; height: 8px; border-radius: 50%;
        background: radial-gradient(circle, #1e3a8a 30%, #090d16 70%);
      }
      .cutout-notch {
        position: absolute; left: 50%; top: 0; transform: translateX(-50%);
        width: 128px; height: 22px; background: #000;
        border-radius: 0 0 14px 14px;
      }
      .cutout-hole {
        position: absolute; left: 50%; top: 9px; transform: translateX(-50%);
        width: 13px; height: 13px; background: #000; border-radius: 50%;
      }
      /* Cámara en esquina superior derecha del iPhone DUO cerrado (como en la foto oficial) */
      .cutout-duo-corner {
        position: absolute; right: 16px; top: 8px;
        width: 15px; height: 15px; background: #000; border-radius: 50%;
        box-shadow: inset 0 0 0 2px #1e293b;
      }
      .status-icons { display: flex; align-items: center; gap: 5px; font-size: 11px; }

      /* IFRAME VIEWPORT */
      .iframe-holder {
        flex: 1; width: 100%; position: relative; overflow: hidden; background: #fff;
      }
      .sim-iframe {
        border: none; display: block;
        transform-origin: 0 0;
        background: #fff;
      }

      /* BARRA SAFARI / NAVEGADOR INFERIOR */
      .mobile-browser-bar {
        height: 52px; background: #f8fafc; border-top: 1px solid #e2e8f0;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 6px 14px 5px; color: #334155; flex-shrink: 0;
      }
      .url-pill {
        background: #e2e8f0; border-radius: 9px; height: 26px;
        display: flex; align-items: center; justify-content: center;
        gap: 6px; font-size: 11px; font-weight: 600; color: #0f172a;
        padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
      }
      .home-indicator {
        width: 115px; height: 4px; background: #0f172a; border-radius: 99px;
        margin: 4px auto 1px; opacity: 0.85;
      }

      /* RIGHT SIDEBAR DEVICE PICKER (ESTILO C13 PRO) */
      .right-sidebar {
        position: fixed; top: 64px; right: 16px; bottom: 16px;
        width: 335px; background: #ffffff; color: #0f172a;
        border-radius: 16px; border: 1px solid #e2e8f0;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
        display: flex; flex-direction: column; overflow: hidden; z-index: 40;
        transition: transform 0.25s ease, opacity 0.25s ease;
      }
      .right-sidebar.closed {
        transform: translateX(370px); opacity: 0; pointer-events: none;
      }
      .sidebar-header {
        padding: 14px 16px; border-bottom: 1px solid #e2e8f0;
        background: #f8fafc;
      }
      .sidebar-label {
        font-size: 10.5px; font-weight: 800; color: #64748b;
        letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 10px;
      }
      .slots-row {
        display: flex; align-items: center; gap: 10px;
      }
      .slot-circle {
        width: 44px; height: 44px; border-radius: 50%;
        border: 2px solid #cbd5e1; background: #fff;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; font-size: 18px; position: relative;
        transition: all 0.15s;
      }
      .slot-circle.active {
        border-color: #0ea5e9; background: rgba(14, 165, 233, 0.08);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
      }
      .slot-circle.add-slot {
        border-style: dashed; color: #0ea5e9; font-weight: 800;
      }
      .free-tag {
        position: absolute; top: -6px; right: -8px;
        background: #10b981; color: #fff; font-size: 8.5px; font-weight: 800;
        padding: 1px 5px; border-radius: 4px;
      }

      .sidebar-body {
        flex: 1; overflow-y: auto; padding: 12px 14px 36px;
      }
      .cat-title {
        font-size: 12px; font-weight: 800; color: #0f172a;
        margin: 14px 0 8px; display: flex; align-items: center; gap: 6px;
      }
      .cat-title:first-child { margin-top: 2px; }
      .cat-badge {
        background: #10b981; color: #fff; font-size: 9px; font-weight: 800;
        padding: 1px 5px; border-radius: 4px;
      }

      .dev-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px;
      }
      .dev-tile {
        background: #ffffff; border: 1.5px solid #e2e8f0;
        border-radius: 10px; padding: 8px 6px;
        display: flex; flex-direction: column; align-items: center;
        text-align: center; gap: 4px; cursor: pointer;
        transition: all 0.14s; position: relative;
      }
      .dev-tile:hover {
        border-color: #0ea5e9; background: #f0f9ff;
      }
      .dev-tile.selected {
        border-color: #0ea5e9; background: #e0f2fe;
        box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
      }
      .mini-phone-svg {
        width: 18px; height: 28px; border: 1.8px solid #475569;
        border-radius: 4px; position: relative; background: #f8fafc;
        margin-top: 8px;
      }
      .mini-phone-svg::before {
        content: ''; position: absolute; top: 2px; left: 50%;
        transform: translateX(-50%); width: 6px; height: 2px;
        background: #475569; border-radius: 2px;
      }
      .dev-tile-name {
        font-size: 10.5px; font-weight: 700; color: #1e293b; line-height: 1.15;
      }
      .dev-tile-res {
        font-size: 9px; color: #64748b;
      }
      .unlocked-pill {
        position: absolute; top: 3px; right: 3px;
        background: rgba(16, 185, 129, 0.16); color: #059669;
        font-size: 7.5px; font-weight: 800; padding: 1px 4px; border-radius: 3px;
      }
    `;

    const root = document.createElement('div');
    root.className = `sim-root theme-${state.bgTheme}`;

    // Top HUD
    const topHud = document.createElement('div');
    topHud.className = 'top-hud';
    topHud.innerHTML = `
      <div class="brand-tag">
        <span class="brand-dot">📱</span>
        <span>C13 Version Movil Responsividad</span>
      </div>
      <button class="hud-btn" id="btn-rotate" title="Rotar Vertical / Horizontal">🔄 Rotar</button>
      <button class="hud-btn active" id="btn-toggle-bar" title="Mostrar/Ocultar barra navegador móvil">🌐 Barra URL</button>
      <button class="hud-btn" id="btn-bg-theme" title="Cambiar fondo de presentación">🎨 Fondo</button>
      <button class="hud-btn capture" id="btn-snap-mockup" title="Descargar captura PNG del móvil con carcasa">📸 Mockup PNG</button>
      <button class="hud-btn record" id="btn-rec-mp4" title="Grabar vídeo interactivo del móvil y descargar en MP4">🔴 Grabar MP4</button>
    `;

    // Corner Controls (Close & Sidebar Toggle)
    const cornerControls = document.createElement('div');
    cornerControls.className = 'corner-controls';
    cornerControls.innerHTML = `
      <button class="round-btn" id="btn-close-sim" title="Cerrar simulador (ESC)">✕</button>
      <button class="round-btn panel-toggle" id="btn-toggle-sidebar" title="Mostrar/Ocultar selector de dispositivos">📱</button>
    `;

    // Stage
    const stageArea = document.createElement('div');
    stageArea.className = 'stage-area';

    // Right Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'right-sidebar';

    shadow.appendChild(style);
    root.appendChild(topHud);
    root.appendChild(cornerControls);
    root.appendChild(stageArea);
    root.appendChild(sidebar);
    shadow.appendChild(root);
    document.documentElement.appendChild(host);

    function renderSidebar() {
      const appleDevs = DEVICES.filter((d) => d.brand === 'apple');
      const androidDevs = DEVICES.filter((d) => d.brand === 'android');
      const tabletDevs = DEVICES.filter((d) => d.brand === 'tablet');
      const activeDevId = state.slots[state.activeSlot].deviceId;

      const renderTiles = (list) =>
        list
          .map(
            (d) => `
          <button class="dev-tile ${d.id === activeDevId ? 'selected' : ''}" data-dev-id="${d.id}">
            <span class="unlocked-pill">${d.tag}</span>
            <div class="mini-phone-svg" style="${d.brand === 'tablet' ? 'width:24px;height:30px;' : ''}"></div>
            <div class="dev-tile-name">${d.name}</div>
            <div class="dev-tile-res">${d.width}×${d.height}</div>
          </button>
        `
          )
          .join('');

      sidebar.innerHTML = `
        <div class="sidebar-header">
          <div class="sidebar-label">DISPOSITIVOS VISIBLES EN LA PESTAÑA</div>
          <div class="slots-row">
            <button class="slot-circle ${state.activeSlot === 0 ? 'active' : ''}" id="slot-0" title="Dispositivo Principal">📱</button>
            ${
              state.dualMode
                ? `<button class="slot-circle ${state.activeSlot === 1 ? 'active' : ''}" id="slot-1" title="Segundo Dispositivo en paralelo">📲<span class="free-tag">2x</span></button>
                   <button class="hud-btn" id="remove-dual" style="margin-left:auto;background:#fee2e2;color:#b91c1c;border-color:#fca5a5;">Quitar 2º</button>`
                : `<button class="slot-circle add-slot" id="add-dual" title="Añadir 2º dispositivo en paralelo (Gratis)">+<span class="free-tag">GRATIS</span></button>`
            }
          </div>
        </div>
        <div class="sidebar-body">
          <div class="cat-title"><span class="cat-badge">PRO GRATIS</span> 🍎 Teléfonos Apple</div>
          <div class="dev-grid">${renderTiles(appleDevs)}</div>

          <div class="cat-title"><span class="cat-badge">PRO GRATIS</span> 🤖 Teléfonos Android</div>
          <div class="dev-grid">${renderTiles(androidDevs)}</div>

          <div class="cat-title"><span class="cat-badge">PRO GRATIS</span> 💻 Plegables y Tablets</div>
          <div class="dev-grid">${renderTiles(tabletDevs)}</div>
        </div>
      `;

      sidebar.querySelector('#slot-0')?.addEventListener('click', () => {
        state.activeSlot = 0;
        renderSidebar();
        highlightActiveSlot();
      });

      sidebar.querySelector('#slot-1')?.addEventListener('click', () => {
        state.activeSlot = 1;
        renderSidebar();
        highlightActiveSlot();
      });

      sidebar.querySelector('#add-dual')?.addEventListener('click', () => {
        state.dualMode = true;
        state.activeSlot = 1;
        renderStage();
        renderSidebar();
      });

      sidebar.querySelector('#remove-dual')?.addEventListener('click', () => {
        state.dualMode = false;
        state.activeSlot = 0;
        renderStage();
        renderSidebar();
      });

      sidebar.querySelectorAll('.dev-tile').forEach((tile) => {
        tile.addEventListener('click', () => {
          const newId = tile.getAttribute('data-dev-id');
          state.slots[state.activeSlot].deviceId = newId;
          chrome.storage.local.set({ selectedDevice: newId });
          updateSlotDevice(state.activeSlot);
          renderSidebar();
        });
      });
    }

    function computeScale(devW, devH) {
      const availH = window.innerHeight - 170;
      const availW = (state.sidebarOpen ? window.innerWidth - 390 : window.innerWidth - 70) / (state.dualMode ? 2.18 : 1);
      const scaleH = availH / (devH + 34);
      const scaleW = availW / (devW + 34);
      return Math.min(1, Math.max(0.35, Math.min(scaleH, scaleW)));
    }

    function createDeviceElement(slotIndex) {
      const slot = state.slots[slotIndex];
      const dev = getDeviceById(slot.deviceId);
      const w = slot.landscape ? dev.height : dev.width;
      const h = slot.landscape ? dev.width : dev.height;
      const scale = computeScale(w, h);

      const scaledW = Math.round(w * scale);
      const scaledH = Math.round(h * scale);
      const statusH = Math.round(36 * scale);
      const navH = state.showBrowserBar ? Math.round(50 * scale) : 0;
      const iframeScaledH = scaledH - statusH - navH;
      const iframeRealH = Math.round(iframeScaledH / scale);

      const wrapper = document.createElement('div');
      wrapper.className = `device-wrapper ${state.activeSlot === slotIndex ? 'selected-slot' : ''}`;
      wrapper.dataset.slotIndex = String(slotIndex);

      const pill = document.createElement('div');
      pill.className = 'device-label-pill';
      pill.innerHTML = `<span>${dev.name}</span> <span style="opacity:0.65">${w} × ${h} px (${Math.round(scale * 100)}%)</span>`;

      const shell = document.createElement('div');
      shell.className = 'hardware-shell';
      shell.style.width = `${scaledW + 26}px`;
      shell.style.height = `${scaledH + 26}px`;
      const rScaled = Math.round(dev.radius * scale);
      const rInner = Math.max(8, Math.round((dev.radius - 10) * scale));

      // Diseño asimétrico real del iPhone DUO cerrado: lomo izquierdo recto (bisagra) y derecha redondeada
      if (dev.cutout === 'duo-closed' && !slot.landscape) {
        shell.style.borderRadius = `8px ${rScaled}px ${rScaled}px 8px`;
      } else {
        shell.style.borderRadius = `${rScaled}px`;
      }
      shell.style.background = dev.frameColor || '#18181b';

      const bezel = document.createElement('div');
      bezel.className = 'screen-bezel';
      if (dev.cutout === 'duo-closed' && !slot.landscape) {
        bezel.style.borderRadius = `4px ${rInner}px ${rInner}px 4px`;
      } else {
        bezel.style.borderRadius = `${rInner}px`;
      }

      // Status bar
      const statusBar = document.createElement('div');
      statusBar.className = 'status-bar';
      statusBar.style.height = `${statusH}px`;
      let cutoutHtml = '';
      if (!slot.landscape) {
        if (dev.cutout === 'island') cutoutHtml = '<div class="cutout-island"></div>';
        else if (dev.cutout === 'duo-closed') cutoutHtml = '<div class="cutout-duo-corner"></div>';
        else if (dev.cutout === 'notch') cutoutHtml = '<div class="cutout-notch"></div>';
        else if (dev.cutout === 'hole') cutoutHtml = '<div class="cutout-hole"></div>';
      }
      statusBar.innerHTML = `
        <span>9:41</span>
        ${cutoutHtml}
        <div class="status-icons" style="${dev.cutout === 'duo-closed' ? 'padding-right:24px;' : ''}"><span>5G</span> <span>📶</span> <span>🔋</span></div>
      `;

      // Iframe holder
      const iframeHolder = document.createElement('div');
      iframeHolder.className = 'iframe-holder';
      if (dev.cutout === 'duo-open') {
        const hinge = document.createElement('div');
        hinge.className = 'duo-hinge-line';
        iframeHolder.appendChild(hinge);
      }
      const iframe = document.createElement('iframe');
      iframe.className = 'sim-iframe';
      iframe.src = state.currentUrl;
      iframe.style.width = `${w}px`;
      iframe.style.height = `${iframeRealH}px`;
      iframe.style.transform = `scale(${scale})`;
      iframeHolder.appendChild(iframe);

      bezel.appendChild(statusBar);
      bezel.appendChild(iframeHolder);

      if (state.showBrowserBar) {
        const hostDomain = (() => {
          try {
            return new URL(state.currentUrl).hostname;
          } catch {
            return state.currentUrl;
          }
        })();
        const navBar = document.createElement('div');
        navBar.className = 'mobile-browser-bar';
        navBar.style.height = `${navH}px`;
        navBar.innerHTML = `
          <div class="url-pill">🔒 ${hostDomain}</div>
          <div class="home-indicator"></div>
        `;
        bezel.appendChild(navBar);
      }

      shell.appendChild(bezel);
      wrapper.appendChild(pill);
      wrapper.appendChild(shell);

      wrapper.addEventListener('mousedown', () => {
        if (state.activeSlot !== slotIndex) {
          state.activeSlot = slotIndex;
          highlightActiveSlot();
          renderSidebar();
        }
      });

      return wrapper;
    }

    function renderStage() {
      stageArea.innerHTML = '';
      stageArea.appendChild(createDeviceElement(0));
      if (state.dualMode) {
        stageArea.appendChild(createDeviceElement(1));
      }
    }

    function updateSlotDevice(slotIndex) {
      const oldEl = stageArea.querySelector(`.device-wrapper[data-slot-index="${slotIndex}"]`);
      const newEl = createDeviceElement(slotIndex);
      if (oldEl) {
        stageArea.replaceChild(newEl, oldEl);
      } else {
        renderStage();
      }
    }

    function highlightActiveSlot() {
      stageArea.querySelectorAll('.device-wrapper').forEach((el) => {
        el.classList.toggle('selected-slot', Number(el.dataset.slotIndex) === state.activeSlot);
      });
    }

    // Eventos de barra superior
    topHud.querySelector('#btn-rotate').addEventListener('click', () => {
      const slot = state.slots[state.activeSlot];
      slot.landscape = !slot.landscape;
      updateSlotDevice(state.activeSlot);
    });

    topHud.querySelector('#btn-toggle-bar').addEventListener('click', (e) => {
      state.showBrowserBar = !state.showBrowserBar;
      e.currentTarget.classList.toggle('active', state.showBrowserBar);
      renderStage();
    });

    topHud.querySelector('#btn-bg-theme').addEventListener('click', () => {
      const order = ['light', 'dark', 'gradient'];
      const next = order[(order.indexOf(state.bgTheme) + 1) % order.length];
      state.bgTheme = next;
      root.className = `sim-root theme-${state.bgTheme}`;
    });

    topHud.querySelector('#btn-snap-mockup').addEventListener('click', async () => {
      // Ocultar HUD y barra lateral un instante para capturar el mockup limpio
      topHud.style.visibility = 'hidden';
      cornerControls.style.visibility = 'hidden';
      sidebar.style.visibility = 'hidden';
      stageArea.querySelectorAll('.device-label-pill').forEach((p) => (p.style.visibility = 'hidden'));

      await new Promise((r) => setTimeout(r, 90));

      chrome.runtime.sendMessage({ type: 'CAPTURE_MOCKUP_TAB' }, async (res) => {
        topHud.style.visibility = 'visible';
        cornerControls.style.visibility = 'visible';
        sidebar.style.visibility = 'visible';
        stageArea.querySelectorAll('.device-label-pill').forEach((p) => (p.style.visibility = 'visible'));

        if (!res || !res.dataUrl) return;

        // Recortar alrededor del dispositivo activo (con margen para la sombra)
        const activeShell = stageArea.querySelector(`.device-wrapper[data-slot-index="${state.activeSlot}"] .hardware-shell`);
        if (!activeShell) return;
        const rect = activeShell.getBoundingClientRect();
        const pad = 28;
        const dpr = window.devicePixelRatio || 1;

        const img = new Image();
        img.onload = () => {
          const sx = Math.max(0, Math.round((rect.left - pad) * dpr));
          const sy = Math.max(0, Math.round((rect.top - pad) * dpr));
          const sw = Math.min(img.width - sx, Math.round((rect.width + pad * 2) * dpr));
          const sh = Math.min(img.height - sy, Math.round((rect.height + pad * 2) * dpr));

          const canvas = document.createElement('canvas');
          canvas.width = sw;
          canvas.height = sh;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

          const dev = getDeviceById(state.slots[state.activeSlot].deviceId);
          const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
          chrome.runtime.sendMessage({
            type: 'DOWNLOAD_MOCKUP_PNG',
            dataUrl: canvas.toDataURL('image/png'),
            filename: `c13-version-movil-${dev.id}-${ts}.png`
          });
        };
        img.src = res.dataUrl;
      });
    });

    // Grabador de Vídeo Mockup en MP4 (Con recorte automático Region Capture al móvil)
    let activeRecorder = null;
    let recStream = null;
    let recChunks = [];
    let recTimer = null;
    let recSeconds = 0;
    const btnRecMp4 = topHud.querySelector('#btn-rec-mp4');

    const stopMockupRecording = () => {
      if (activeRecorder && activeRecorder.state !== 'inactive') {
        activeRecorder.stop();
      }
      clearInterval(recTimer);
      recStream?.getTracks().forEach((t) => t.stop());
      btnRecMp4.classList.remove('recording');
      btnRecMp4.textContent = '🔴 Grabar MP4';
    };

    btnRecMp4.addEventListener('click', async () => {
      if (activeRecorder && activeRecorder.state === 'recording') {
        stopMockupRecording();
        return;
      }

      try {
        recChunks = [];
        recStream = await navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: { ideal: 60 } },
          audio: false,
          preferCurrentTab: true,
          selfBrowserSurface: 'include'
        });

        const [videoTrack] = recStream.getVideoTracks();

        // Si el navegador soporta Region Capture (CropTarget), recortar el vídeo directamente al móvil activo
        const activeShell = stageArea.querySelector(`.device-wrapper[data-slot-index="${state.activeSlot}"] .hardware-shell`);
        if (window.CropTarget && activeShell && !state.dualMode && typeof videoTrack.cropTo === 'function') {
          try {
            const cropTarget = await window.CropTarget.fromElement(activeShell);
            await videoTrack.cropTo(cropTarget);
          } catch (cropErr) {
            console.warn('Grabando pestaña completa (sin CropTarget):', cropErr);
          }
        }

        const mp4Types = [
          'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
          'video/mp4;codecs=avc1',
          'video/mp4',
          'video/webm;codecs=h264',
          'video/webm;codecs=vp9',
          'video/webm'
        ];
        const chosenMime = mp4Types.find((t) => MediaRecorder.isTypeSupported(t)) || 'video/webm';

        activeRecorder = new MediaRecorder(recStream, {
          mimeType: chosenMime,
          videoBitsPerSecond: 8000000
        });

        activeRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) recChunks.push(e.data);
        };

        activeRecorder.onstop = () => {
          const blob = new Blob(recChunks, { type: chosenMime });
          const reader = new FileReader();
          reader.onloadend = () => {
            const dev = getDeviceById(state.slots[state.activeSlot].deviceId);
            const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            chrome.runtime.sendMessage({
              type: 'DOWNLOAD_MOCKUP_PNG',
              dataUrl: reader.result,
              filename: `c13-version-movil-${dev.id}-${ts}.mp4`
            });
          };
          reader.readAsDataURL(blob);
        };

        videoTrack.onended = () => stopMockupRecording();

        activeRecorder.start(400);
        recSeconds = 0;
        btnRecMp4.classList.add('recording');
        btnRecMp4.textContent = '⏹️ Parar MP4 (00:00)';

        recTimer = setInterval(() => {
          recSeconds++;
          const m = String(Math.floor(recSeconds / 60)).padStart(2, '0');
          const s = String(recSeconds % 60).padStart(2, '0');
          btnRecMp4.textContent = `⏹️ Parar MP4 (${m}:${s})`;
        }, 1000);
      } catch (err) {
        console.warn('Grabación MP4 cancelada:', err);
        stopMockupRecording();
      }
    });

    const closeSimulator = () => {
      if (activeRecorder && activeRecorder.state === 'recording') {
        stopMockupRecording();
      }
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('resize', onResize);
      host.remove();
      document.documentElement.style.overflow = window.__c13PrevOverflow || '';
    };

    cornerControls.querySelector('#btn-close-sim').addEventListener('click', closeSimulator);

    cornerControls.querySelector('#btn-toggle-sidebar').addEventListener('click', () => {
      state.sidebarOpen = !state.sidebarOpen;
      sidebar.classList.toggle('closed', !state.sidebarOpen);
      stageArea.classList.toggle('full-width', !state.sidebarOpen);
      setTimeout(renderStage, 260);
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeSimulator();
    };
    const onResize = () => renderStage();

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('resize', onResize);

    renderStage();
    renderSidebar();
  }
})();
