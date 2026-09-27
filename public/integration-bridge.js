(() => {
  const ROUTES = new Set([
    'dashboard','inventory','add-ingredient','ingredient-detail','add-stock',
    'stock-counts','new-stock-count','stock-count-detail','stock-count-review',
    'wastage','new-wastage','wastage-detail','transfers','new-transfer','transfer-detail',
    'purchases','new-purchase','purchase-detail','suppliers','add-supplier','supplier-detail',
    'recipes','add-recipe','recipe-detail','production','record-production','reports','staff','settings'
  ]);

  const ALIASES = {
    'review-finalize': 'stock-count-review',
    'record-wastage': 'new-wastage',
    'edit-supplier': 'supplier-detail'
  };

  const SCREEN = (location.pathname.match(/\/(\d{2}_[^/]+)\//) || [])[1] || '';

  const BUTTON_ROUTES = {
    '01_dashboard': {
      'add stock': 'add-stock',
      'record wastage': 'new-wastage',
      'stock count': 'new-stock-count',
      'new purchase': 'new-purchase',
      'review': 'stock-count-review',
      'receive': 'purchase-detail'
    },
    '02_inventory': {
      '+ add stock': 'add-stock',
      'add stock': 'add-stock',
      '+ add ingredient': 'add-ingredient',
      'add ingredient': 'add-ingredient',
      'view': 'ingredient-detail'
    },
    '22_recipes_overview': {
      'add recipe': 'add-recipe',
      'view details': 'recipe-detail'
    }
  };

  const normalize = value => {
    if (!value) return '';
    const cleaned = String(value).replace(/^#/, '').trim();
    return ALIASES[cleaned] || cleaned;
  };

  const navigate = value => {
    const route = normalize(value);
    if (!ROUTES.has(route)) return false;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'mise:navigate', route }, window.location.origin);
      return true;
    }
    window.location.hash = route;
    return true;
  };

  const cleanText = element => (element?.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();

  function exportFirstVisibleTable() {
    const tables = [...document.querySelectorAll('table')].filter(t => t.offsetParent !== null);
    const table = tables[0];
    if (!table) return false;
    const rows = [...table.querySelectorAll('tr')].map(row =>
      [...row.querySelectorAll('th,td')].map(cell => `"${(cell.innerText || '').replace(/"/g, '""').trim()}"`).join(',')
    );
    if (!rows.length) return false;
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${SCREEN || 'restaurant-report'}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    return true;
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) {
      const route = normalize(anchor.getAttribute('href'));
      if (ROUTES.has(route)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        navigate(route);
        return;
      }
    }

    const button = event.target.closest('button');
    if (!button) return;
    const text = cleanText(button).replace(/^[a-z_]+\s+/, '').trim();

    // Make unhandled CSV export controls useful without a backend.
    if (!button.getAttribute('onclick') && /export( csv)?$/.test(text)) {
      if (exportFirstVisibleTable()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }

    const map = BUTTON_ROUTES[SCREEN];
    if (map && !button.getAttribute('onclick')) {
      const exact = map[text];
      if (exact) {
        event.preventDefault();
        event.stopImmediatePropagation();
        navigate(exact);
        return;
      }
    }

    // Recipes Overview intentionally uses a dedicated Add Recipe screen in this integrated app.
    if (SCREEN === '22_recipes_overview' && text === 'add recipe') {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate('add-recipe');
    }
  }, true);

  // Inventory rows are navigable to the ingredient detail page when the click is not on an action control.
  if (SCREEN === '02_inventory') {
    document.addEventListener('click', event => {
      if (event.target.closest('button,a,input,select,textarea,label')) return;
      const row = event.target.closest('tbody tr');
      if (row) navigate('ingredient-detail');
    });
  }

  window.addEventListener('hashchange', () => {
    const route = normalize(window.location.hash);
    if (ROUTES.has(route)) navigate(route);
  });

  window.MiseFrontend = {
    navigate,
    emit(name, detail = {}) {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'mise:event', name, detail }, window.location.origin);
      }
    },
    getState() {
      try { return JSON.parse(sessionStorage.getItem('mise_frontend_state') || '{}'); }
      catch { return {}; }
    },
    setState(next) {
      sessionStorage.setItem('mise_frontend_state', JSON.stringify(next || {}));
    }
  };
})();
