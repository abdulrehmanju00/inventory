import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_BRANCH,
  CURRENT_USER,
  STORAGE_LOCATIONS,
  INITIAL_INGREDIENTS,
  INITIAL_BALANCES,
  INITIAL_MOVEMENTS,
  INITIAL_STOCK_COUNTS,
  INITIAL_WASTAGE,
  INITIAL_TRANSFERS,
  INITIAL_PURCHASES,
  INITIAL_SUPPLIERS,
  INITIAL_RECIPES,
  INITIAL_PRODUCTIONS,
  INITIAL_STAFF,
  INITIAL_SETTINGS
} from '../data/mockData';
import { calculateStockStatus } from '../utils/inventory';

const STORAGE_KEY = 'restaurant_inventory_state_v2';

const AppContext = createContext(null);

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ingredients: parsed.ingredients || INITIAL_INGREDIENTS,
        balances: parsed.balances || parsed.inventoryBalances || INITIAL_BALANCES,
        movements: parsed.movements || parsed.inventoryMovements || INITIAL_MOVEMENTS,
        stockCounts: parsed.stockCounts || INITIAL_STOCK_COUNTS,
        wastage: parsed.wastage || INITIAL_WASTAGE,
        transfers: parsed.transfers || INITIAL_TRANSFERS,
        purchases: parsed.purchases || INITIAL_PURCHASES,
        suppliers: parsed.suppliers || INITIAL_SUPPLIERS,
        recipes: parsed.recipes || INITIAL_RECIPES,
        productions: parsed.productions || INITIAL_PRODUCTIONS,
        staff: parsed.staff || INITIAL_STAFF,
        settings: parsed.settings || INITIAL_SETTINGS,
        activity: parsed.activity || [
          { id: 'act-1', text: 'Stock added · Chicken Breast (20 kg)', time: '12 min ago', type: 'primary' },
          { id: 'act-2', text: 'Wastage recorded · Cooking Oil (2 L)', time: '34 min ago', type: 'amber' },
          { id: 'act-3', text: 'Purchase created · Fresh Foods Supplier', time: '1 hr ago', type: 'primary' },
          { id: 'act-4', text: 'Stock count completed · Main Store', time: '2 hrs ago', type: 'secondary' }
        ]
      };
    }
  } catch (e) {
    console.warn('Could not load stored prototype state, fallback to initial mock data', e);
  }

  return {
    ingredients: INITIAL_INGREDIENTS,
    balances: INITIAL_BALANCES,
    movements: INITIAL_MOVEMENTS,
    stockCounts: INITIAL_STOCK_COUNTS,
    wastage: INITIAL_WASTAGE,
    transfers: INITIAL_TRANSFERS,
    purchases: INITIAL_PURCHASES,
    suppliers: INITIAL_SUPPLIERS,
    recipes: INITIAL_RECIPES,
    productions: INITIAL_PRODUCTIONS,
    staff: INITIAL_STAFF,
    settings: INITIAL_SETTINGS,
    activity: [
      { id: 'act-1', text: 'Stock added · Chicken Breast (20 kg)', time: '12 min ago', type: 'primary' },
      { id: 'act-2', text: 'Wastage recorded · Cooking Oil (2 L)', time: '34 min ago', type: 'amber' },
      { id: 'act-3', text: 'Purchase created · Fresh Foods Supplier', time: '1 hr ago', type: 'primary' },
      { id: 'act-4', text: 'Stock count completed · Main Store', time: '2 hrs ago', type: 'secondary' }
    ]
  };
}

export function AppProvider({ children }) {
  const initialState = loadInitialState();

  const [currentBranch] = useState(INITIAL_BRANCH);
  const [currentUser] = useState(CURRENT_USER);

  // Core Location-Aware Data Store
  const [rawIngredients, setRawIngredients] = useState(initialState.ingredients);
  const [balances, setBalances] = useState(initialState.balances);
  const [movements, setMovements] = useState(initialState.movements);

  // Domain Workflows
  const [stockCounts, setStockCounts] = useState(initialState.stockCounts);
  const [wastage, setWastage] = useState(initialState.wastage);
  const [transfers, setTransfers] = useState(initialState.transfers);
  const [purchases, setPurchases] = useState(initialState.purchases);
  const [suppliers, setSuppliers] = useState(initialState.suppliers);
  const [recipes, setRecipes] = useState(initialState.recipes);
  const [productions, setProductions] = useState(initialState.productions);
  const [staff, setStaff] = useState(initialState.staff);
  const [settings, setSettings] = useState(initialState.settings);
  const [activity, setActivity] = useState(initialState.activity);

  // Active detail selection
  const [selectedIngredientId, setSelectedIngredientId] = useState('ing-1');
  const [selectedStockCountId, setSelectedStockCountId] = useState('CNT-1047');
  const [selectedWastageId, setSelectedWastageId] = useState('WST-2041');
  const [selectedTransferId, setSelectedTransferId] = useState('TRF-5011');
  const [selectedPurchaseId, setSelectedPurchaseId] = useState('PO-8821');
  const [selectedSupplierId, setSelectedSupplierId] = useState('sup-1');
  const [selectedRecipeId, setSelectedRecipeId] = useState('RCP-1026');

  // Global Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success', title: '' });

  const showToast = (message, type = 'success', title = '') => {
    setToast({ show: true, message, type, title });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const addActivity = (text, type = 'primary') => {
    setActivity(prev => [
      { id: `act-${Date.now()}`, text, time: 'Just now', type },
      ...prev.slice(0, 9)
    ]);
  };

  // Helper: query stock for exact ingredientId and location
  const getLocationStock = (ingredientId, location) => {
    const item = balances.find(b => b.ingredientId === ingredientId && b.location === location);
    return item ? Number(item.quantity) || 0 : 0;
  };

  // Helper: query total stock for exact ingredientId
  const getTotalIngredientStock = (ingredientId) => {
    return balances
      .filter(b => b.ingredientId === ingredientId)
      .reduce((sum, b) => sum + (Number(b.quantity) || 0), 0);
  };

  // Helper: get dictionary of location balances for an ingredient
  const getIngredientBalances = (ingredientId) => {
    const map = {};
    STORAGE_LOCATIONS.forEach(loc => {
      map[loc] = getLocationStock(ingredientId, loc);
    });
    return map;
  };

  // Computed ingredients: Total Stock = sum of all location balances for that ingredient
  const ingredients = useMemo(() => {
    return rawIngredients.map(ing => {
      const locBals = {};
      let totalStock = 0;
      STORAGE_LOCATIONS.forEach(loc => {
        const found = balances.find(b => b.ingredientId === ing.id && b.location === loc);
        const qty = found ? Number(found.quantity) || 0 : 0;
        locBals[loc] = qty;
        totalStock += qty;
      });
      const roundedStock = Math.round(totalStock * 1000) / 1000;
      const status = calculateStockStatus(roundedStock, ing.minStock);

      return {
        ...ing,
        currentStock: roundedStock,
        status,
        locationBalances: locBals
      };
    });
  }, [rawIngredients, balances]);

  // Sync to browser localStorage prototype persistence
  useEffect(() => {
    try {
      const dataToSave = {
        ingredients: rawIngredients,
        balances,
        movements,
        stockCounts,
        wastage,
        transfers,
        purchases,
        suppliers,
        recipes,
        productions,
        staff,
        settings,
        activity
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Could not persist shared frontend state to browser storage', e);
    }
  }, [rawIngredients, balances, movements, stockCounts, wastage, transfers, purchases, suppliers, recipes, productions, staff, settings, activity]);

  // 1. Add Ingredient -> registered across store and balances initialized
  const addIngredient = (ingredientData) => {
    const id = `ing-${Date.now()}`;
    const startingStock = Number(ingredientData.currentStock) || 0;
    const min = Number(ingredientData.minStock) || 0;
    const primaryLocation = ingredientData.location || 'Main Store';

    const newIng = {
      ...ingredientData,
      id,
      minStock: min,
      unitCost: Number(ingredientData.unitCost) || 0,
      location: primaryLocation
    };

    setRawIngredients(prev => [newIng, ...prev]);

    // Initialize location balances
    setBalances(prev => {
      const newEntries = STORAGE_LOCATIONS.map(loc => ({
        ingredientId: id,
        location: loc,
        quantity: loc === primaryLocation ? startingStock : 0
      }));
      return [...newEntries, ...prev];
    });

    if (startingStock > 0) {
      const mov = {
        id: `mov-${Date.now()}`,
        type: 'STOCK_IN',
        ingredientId: id,
        location: primaryLocation,
        quantity: startingStock,
        date: new Date().toISOString(),
        reference: 'INITIAL_REGISTRATION',
        notes: `Initial stock setup during ingredient registration`
      };
      setMovements(prev => [mov, ...prev]);
    }

    showToast(`${newIng.name} created successfully`, 'success', 'Ingredient Added');
    addActivity(`New ingredient created · ${newIng.name}`, 'primary');
    return newIng;
  };

  const updateIngredient = (id, updates) => {
    setRawIngredients(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Ingredient updated successfully', 'success');
  };

  // 2. Add Stock -> increases ONLY the selected location's balance and creates STOCK_IN movement
  const addStock = ({ ingredientId, quantity, unit, location, source, notes, reference }) => {
    const qty = Number(quantity);
    if (qty <= 0) return;

    const targetLoc = location || 'Main Store';
    const ing = ingredients.find(i =>
      i.id === ingredientId ||
      i.name.toLowerCase() === String(ingredientId).toLowerCase()
    );

    const finalIngId = ing ? ing.id : ingredientId;
    const ingName = ing ? ing.name : 'Ingredient';

    // 1. Update ONLY that location's balance
    setBalances(prev => {
      let found = false;
      const updated = prev.map(b => {
        if (b.ingredientId === finalIngId && b.location === targetLoc) {
          found = true;
          const newQty = Math.round(((Number(b.quantity) || 0) + qty) * 1000) / 1000;
          return { ...b, quantity: newQty };
        }
        return b;
      });

      if (!found) {
        updated.push({
          ingredientId: finalIngId,
          location: targetLoc,
          quantity: qty
        });
      }
      return updated;
    });

    // 2. Create inventory movement record
    const ref = reference || `STK-${Date.now().toString().slice(-6)}`;
    const movement = {
      id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: 'STOCK_IN',
      ingredientId: finalIngId,
      location: targetLoc,
      quantity: qty,
      date: new Date().toISOString(),
      reference: ref,
      notes: notes || `Stock in from ${source || 'direct receipt'}`
    };
    setMovements(prev => [movement, ...prev]);

    showToast(`${qty} ${unit || ing?.stockUnit || 'units'} added to ${targetLoc}`, 'success', 'Stock Received');
    addActivity(`Stock added · ${ingName} (${qty} ${unit || ing?.stockUnit || ''}) at ${targetLoc}`, 'primary');
  };

  // 3. Record Wastage -> verifies sufficient location quantity, rejects if insufficient, deducts ONLY from selected location
  const recordWastage = (data) => {
    const qty = Number(data.quantity) || 0;
    const loc = data.location;
    const ingId = data.ingredientId || (ingredients.find(i => i.name.toLowerCase() === (data.ingredientName || '').toLowerCase())?.id);
    const ing = ingredients.find(i => i.id === ingId);
    const ingName = ing ? ing.name : data.ingredientName || 'Item';

    if (!ingId) {
      const err = 'Ingredient is required to record wastage.';
      showToast(err, 'error', 'Validation Error');
      throw new Error(err);
    }
    if (!loc) {
      const err = 'Location is required to record wastage.';
      showToast(err, 'error', 'Validation Error');
      throw new Error(err);
    }
    if (qty <= 0) {
      const err = 'Wastage quantity must be greater than zero.';
      showToast(err, 'error', 'Validation Error');
      throw new Error(err);
    }

    // Verify selected location has sufficient stock
    const currentLocStock = balances.find(b => b.ingredientId === ingId && b.location === loc)?.quantity || 0;
    if (qty > currentLocStock) {
      const err = `Insufficient stock at ${loc}. Available: ${currentLocStock} ${data.unit || ing?.stockUnit || 'units'}, requested: ${qty} ${data.unit || ing?.stockUnit || 'units'}. Negative stock is not allowed.`;
      showToast(err, 'error', 'Wastage Rejected');
      throw new Error(err);
    }

    const id = `WST-${2042 + wastage.length}`;
    const newWastage = {
      id,
      ...data,
      ingredientId: ingId,
      ingredientName: ingName,
      quantity: qty,
      location: loc,
      recordedBy: currentUser.name,
      date: new Date().toISOString(),
      displayDate: 'Today, Just now'
    };

    // Deduct ONLY from selected location
    setBalances(prev =>
      prev.map(b => {
        if (b.ingredientId === ingId && b.location === loc) {
          const newQty = Math.round((b.quantity - qty) * 1000) / 1000;
          return { ...b, quantity: Math.max(0, newQty) };
        }
        return b;
      })
    );

    setWastage(prev => [newWastage, ...prev]);

    // Create inventory movement
    const movement = {
      id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: 'WASTAGE',
      ingredientId: ingId,
      location: loc,
      quantity: -qty,
      date: new Date().toISOString(),
      reference: id,
      notes: data.notes || data.reason || 'Recorded spoilage / waste'
    };
    setMovements(prev => [movement, ...prev]);

    showToast(`Wastage record ${id} logged (${qty} ${data.unit || ing?.stockUnit}) deducted from ${loc}`, 'error', 'Wastage Recorded');
    addActivity(`Wastage recorded · ${ingName} (${qty} ${data.unit || ing?.stockUnit}) from ${loc}`, 'amber');
    return newWastage;
  };

  // 4. Transfers -> atomic verification & transfer between exact locations
  const createTransfer = (transferData) => {
    const { fromLocation, toLocation, items, notes } = transferData;
    if (fromLocation === toLocation) {
      const err = 'Source and destination locations must be different.';
      showToast(err, 'warning', 'Invalid Transfer');
      throw new Error(err);
    }
    if (!items || !items.length) {
      const err = 'At least one item is required to dispatch transfer.';
      showToast(err, 'warning', 'No Items');
      throw new Error(err);
    }

    // 1. Validate every line before changing state
    const resolvedItems = [];
    for (const item of items) {
      const qtyStr = typeof item.qty === 'string' ? item.qty : String(item.quantity || item.qty || '');
      const rawQty = parseFloat(qtyStr.split(/\s+/)[0]) || 0;
      if (rawQty <= 0) {
        const err = `Invalid transfer quantity for ${item.name}. Must be greater than zero.`;
        showToast(err, 'error', 'Validation Error');
        throw new Error(err);
      }

      const ing = ingredients.find(i =>
        (item.ingredientId && i.id === item.ingredientId) ||
        (i.name.toLowerCase() === item.name.toLowerCase())
      );
      if (!ing) {
        const err = `Ingredient ${item.name} not found in inventory.`;
        showToast(err, 'error', 'Validation Error');
        throw new Error(err);
      }

      // Check available stock at exact source location
      const sourceBal = balances.find(b => b.ingredientId === ing.id && b.location === fromLocation);
      const availableSourceQty = sourceBal ? Number(sourceBal.quantity) || 0 : 0;

      if (availableSourceQty < rawQty) {
        const err = `Transfer rejected: Insufficient stock for ${ing.name} at ${fromLocation}. Available: ${availableSourceQty} ${ing.stockUnit}, requested: ${rawQty} ${ing.stockUnit}.`;
        showToast(err, 'error', 'Transfer Rejected');
        throw new Error(err);
      }

      resolvedItems.push({
        ingredientId: ing.id,
        name: ing.name,
        qty: rawQty,
        unit: ing.stockUnit
      });
    }

    // 2. Atomic state update: source decreases, destination increases
    const id = `TRF-${5012 + transfers.length}`;
    const newTrf = {
      id,
      fromLocation,
      toLocation,
      itemCount: resolvedItems.length,
      items: resolvedItems.map(it => ({
        ingredientId: it.ingredientId,
        name: it.name,
        qty: `${it.qty} ${it.unit}`
      })),
      status: 'In Transit',
      requestedBy: currentUser.name,
      date: new Date().toISOString(),
      displayDate: 'Today',
      notes: notes || ''
    };

    setBalances(prev => {
      let updated = [...prev];
      resolvedItems.forEach(item => {
        // Decrease source
        updated = updated.map(b => {
          if (b.ingredientId === item.ingredientId && b.location === fromLocation) {
            const newQty = Math.round((b.quantity - item.qty) * 1000) / 1000;
            return { ...b, quantity: Math.max(0, newQty) };
          }
          return b;
        });

        // Increase destination
        let foundDest = false;
        updated = updated.map(b => {
          if (b.ingredientId === item.ingredientId && b.location === toLocation) {
            foundDest = true;
            const newQty = Math.round(((Number(b.quantity) || 0) + item.qty) * 1000) / 1000;
            return { ...b, quantity: newQty };
          }
          return b;
        });
        if (!foundDest) {
          updated.push({
            ingredientId: item.ingredientId,
            location: toLocation,
            quantity: item.qty
          });
        }
      });
      return updated;
    });

    // 3. Create TRANSFER_OUT and TRANSFER_IN movements with the same transfer reference
    const nowIso = new Date().toISOString();
    const newMovements = [];
    resolvedItems.forEach(item => {
      newMovements.push({
        id: `mov-${Date.now()}-${Math.floor(Math.random() * 10000)}-out`,
        type: 'TRANSFER_OUT',
        ingredientId: item.ingredientId,
        location: fromLocation,
        quantity: -item.qty,
        date: nowIso,
        reference: id,
        notes: `Transfer ${id} dispatched to ${toLocation}`
      });
      newMovements.push({
        id: `mov-${Date.now()}-${Math.floor(Math.random() * 10000)}-in`,
        type: 'TRANSFER_IN',
        ingredientId: item.ingredientId,
        location: toLocation,
        quantity: item.qty,
        date: nowIso,
        reference: id,
        notes: `Transfer ${id} received from ${fromLocation}`
      });
    });
    setMovements(prev => [...newMovements, ...prev]);

    setTransfers(prev => [newTrf, ...prev]);
    showToast(`Transfer ${id} dispatched from ${fromLocation} to ${toLocation}`, 'success', 'Transfer Dispatched');
    addActivity(`Transfer dispatched · ${id} (${fromLocation} → ${toLocation})`, 'primary');
    return newTrf;
  };

  const updateTransferStatus = (id, newStatus) => {
    setTransfers(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`Transfer ${id} status updated to ${newStatus}`, 'success');
    addActivity(`Transfer completed · ${id}`, 'secondary');
  };

  // 5. Stock Count Finalization -> operates by ingredientId + location, requires countedItems === totalItems
  const startStockCount = ({ location, notes }) => {
    const id = `CNT-${1048 + stockCounts.length}`;
    const targetLoc = location || 'Walk-in Cooler';

    const countItems = ingredients.map(ing => {
      const systemStock = targetLoc === 'All' ? ing.currentStock : getLocationStock(ing.id, targetLoc);
      return {
        id: ing.id,
        name: ing.name,
        systemStock,
        countedStock: null,
        unit: ing.stockUnit,
        unitCost: ing.unitCost,
        diff: null,
        status: 'Uncounted'
      };
    });

    const newCount = {
      id,
      date: new Date().toISOString(),
      displayDate: 'Today, Just now',
      location: targetLoc,
      scope: `${countItems.length} ingredients`,
      countedItemsCount: 0,
      totalItemsCount: countItems.length,
      progress: 0,
      differencesCount: 0,
      status: 'In Progress',
      countedBy: currentUser.name,
      notes: notes || '',
      items: countItems
    };

    setStockCounts(prev => [newCount, ...prev]);
    setSelectedStockCountId(id);
    showToast(`Stock count ${id} initialized for ${targetLoc}`, 'success', 'Stock Count Started');
    addActivity(`Stock count started · ${id} (${targetLoc})`, 'secondary');
    return newCount;
  };

  const updateStockCountItem = (countId, itemId, countedVal) => {
    setStockCounts(prev =>
      prev.map(count => {
        if (count.id === countId) {
          const items = count.items.map(it => {
            if (it.id === itemId) {
              const counted = countedVal === '' || countedVal === null ? null : Number(countedVal);
              const diff = counted === null ? null : Math.round((counted - it.systemStock) * 1000) / 1000;
              const status = counted === null ? 'Uncounted' : diff === 0 ? 'Match' : 'Variance';
              return { ...it, countedStock: counted, diff, status };
            }
            return it;
          });
          const countedCount = items.filter(it => it.countedStock !== null).length;
          const diffCount = items.filter(it => it.diff !== null && it.diff !== 0).length;
          const progress = items.length > 0 ? Math.round((countedCount / items.length) * 100) : 0;
          return {
            ...count,
            items,
            countedItemsCount: countedCount,
            differencesCount: diffCount,
            progress
          };
        }
        return count;
      })
    );
  };

  const finalizeStockCount = (countId, notes = '') => {
    const count = stockCounts.find(c => c.id === countId);
    if (!count) {
      showToast('Stock count record not found.', 'error');
      return;
    }

    if (!count.items || count.items.length === 0) {
      showToast('No items in stock count.', 'error');
      return;
    }

    // Enforce: countedItems === totalItems before Finalize
    const uncounted = count.items.filter(it => it.countedStock === null || it.countedStock === undefined);
    if (uncounted.length > 0) {
      const err = `Cannot finalize count ${countId}: ${uncounted.length} items remain uncounted. All items must be counted before finalization.`;
      showToast(err, 'error', 'Uncounted Items');
      throw new Error(err);
    }

    const countLoc = count.location;
    const adjustments = [];
    const newMovements = [];
    const nowIso = new Date().toISOString();

    // Calculate finalized adjustments first
    count.items.forEach(it => {
      const ingredientId = it.id;
      const targetLocation = countLoc === 'All' ? (ingredients.find(i => i.id === ingredientId)?.location || 'Main Store') : countLoc;
      const currentBalObj = balances.find(b => b.ingredientId === ingredientId && b.location === targetLocation);
      const systemQuantity = currentBalObj ? Number(currentBalObj.quantity) || 0 : 0;
      const countedQuantity = Number(it.countedStock) || 0;
      const variance = Math.round((countedQuantity - systemQuantity) * 1000) / 1000;

      adjustments.push({
        ingredientId,
        location: targetLocation,
        countedQuantity,
        variance
      });

      if (variance !== 0) {
        newMovements.push({
          id: `mov-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          type: 'STOCK_COUNT_ADJUSTMENT',
          ingredientId,
          location: targetLocation,
          quantity: variance,
          date: nowIso,
          reference: countId,
          notes: `Stock count adjustment for ${it.name} (Variance: ${variance > 0 ? '+' : ''}${variance} ${it.unit})`
        });
      }
    });

    // Clean state updates (no nested setters)
    setBalances(prev => {
      let updated = [...prev];
      adjustments.forEach(adj => {
        let found = false;
        updated = updated.map(b => {
          if (b.ingredientId === adj.ingredientId && b.location === adj.location) {
            found = true;
            return { ...b, quantity: adj.countedQuantity };
          }
          return b;
        });
        if (!found) {
          updated.push({
            ingredientId: adj.ingredientId,
            location: adj.location,
            quantity: adj.countedQuantity
          });
        }
      });
      return updated;
    });

    if (newMovements.length > 0) {
      setMovements(prev => [...newMovements, ...prev]);
    }

    setStockCounts(prev =>
      prev.map(c => {
        if (c.id === countId) {
          return {
            ...c,
            status: 'Completed',
            progress: 100,
            notes: notes || c.notes
          };
        }
        return c;
      })
    );

    showToast(`Stock count ${countId} finalized and ${adjustments.length} items reconciled`, 'success', 'Stock Count Completed');
    addActivity(`Stock count completed · ${countId} (${countLoc})`, 'secondary');
  };

  // 6. Purchases & Receiving -> prevents double receiving, adds items to receiving location, creates STOCK_IN movements
  const createPurchase = (purchaseData) => {
    const id = `PO-${8822 + purchases.length}`;
    const newPO = {
      id,
      ...purchaseData,
      status: 'Awaiting Receiving',
      createdBy: currentUser.name,
      orderDate: new Date().toISOString(),
      displayDate: 'Today'
    };
    setPurchases(prev => [newPO, ...prev]);
    showToast(`Purchase Order ${id} created for ${purchaseData.supplier}`, 'success', 'Purchase Created');
    addActivity(`Purchase created · ${purchaseData.supplier} (${id})`, 'primary');
    return newPO;
  };

  const receivePurchase = (poId, receivingLocation = 'Main Store') => {
    const po = purchases.find(p => p.id === poId);
    if (!po) {
      showToast('Purchase Order not found.', 'error');
      return;
    }

    if (po.status === 'Received') {
      showToast(`Purchase Order ${poId} has already been received.`, 'warning', 'Already Received');
      return;
    }

    if (!po.items || po.items.length === 0) {
      showToast('PO has no line items to receive.', 'error');
      return;
    }

    const targetLoc = receivingLocation || 'Main Store';
    const nowIso = new Date().toISOString();
    const additions = [];
    const newMovements = [];

    po.items.forEach(line => {
      const addedQty = Number(line.quantity) || 0;
      if (addedQty <= 0) return;

      const ing = ingredients.find(i =>
        i.name.toLowerCase() === line.ingredient.toLowerCase() ||
        i.id === line.ingredientId
      );

      const ingredientId = ing ? ing.id : `ing-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      additions.push({
        ingredientId,
        name: line.ingredient,
        qty: addedQty,
        unit: line.unit || 'kg',
        unitCost: line.unitCost || 100,
        supplier: po.supplier,
        location: targetLoc
      });

      newMovements.push({
        id: `mov-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        type: 'STOCK_IN',
        ingredientId,
        location: targetLoc,
        quantity: addedQty,
        date: nowIso,
        reference: poId,
        notes: `PO Received from ${po.supplier}`
      });
    });

    // Update balances
    setBalances(prev => {
      let updated = [...prev];
      additions.forEach(item => {
        let found = false;
        updated = updated.map(b => {
          if (b.ingredientId === item.ingredientId && b.location === targetLoc) {
            found = true;
            const newQty = Math.round(((Number(b.quantity) || 0) + item.qty) * 1000) / 1000;
            return { ...b, quantity: newQty };
          }
          return b;
        });
        if (!found) {
          updated.push({
            ingredientId: item.ingredientId,
            location: targetLoc,
            quantity: item.qty
          });
        }
      });
      return updated;
    });

    // Add new ingredients to catalog if not previously present
    setRawIngredients(prev => {
      let updated = [...prev];
      additions.forEach(item => {
        if (!updated.some(i => i.id === item.ingredientId)) {
          updated.push({
            id: item.ingredientId,
            name: item.name,
            sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
            category: 'Dry Goods',
            minStock: Math.round(item.qty * 0.3),
            stockUnit: item.unit,
            recipeUnit: item.unit,
            conversionRate: 1,
            unitCost: item.unitCost,
            location: targetLoc,
            supplier: item.supplier,
            status: 'Healthy'
          });
        }
      });
      return updated;
    });

    setMovements(prev => [...newMovements, ...prev]);

    // Mark PO Received only once
    setPurchases(prev =>
      prev.map(p => (p.id === poId ? { ...p, status: 'Received' } : p))
    );

    showToast(`Purchase Order ${poId} received into ${targetLoc}!`, 'success', 'PO Received');
    addActivity(`Purchase received · ${poId} (${po.supplier})`, 'primary');
  };

  // 7. Suppliers & Recipes
  const addSupplier = (supplierData) => {
    const id = `sup-${Date.now()}`;
    const newSup = {
      id,
      ...supplierData,
      rating: 5.0,
      activeItemCount: 0,
      status: 'Active'
    };
    setSuppliers(prev => [newSup, ...prev]);
    showToast(`Supplier ${newSup.name} added to approved vendor list`, 'success', 'Supplier Registered');
    addActivity(`New supplier added · ${newSup.name}`, 'primary');
    return newSup;
  };

  const addRecipe = (recipeData) => {
    const id = `rcp-${Date.now()}`;
    const newRcp = {
      id,
      ...recipeData,
      status: 'Active'
    };
    setRecipes(prev => [newRcp, ...prev]);
    showToast(`Recipe ${newRcp.name} saved to recipe master`, 'success', 'Recipe Saved');
    addActivity(`Recipe added · ${newRcp.name}`, 'primary');
    return newRcp;
  };

  // 8. Production -> enforces Actual + Wastage = Planned, checks all recipe ingredients stock, blocks if insufficient, deducts cleanly
  const recordProduction = (prodData) => {
    const planned = Number(prodData.plannedQuantity) || 0;
    const actual = Number(prodData.actualOutput) || 0;
    const waste = Number(prodData.productionWastage) || 0;

    // 1. Validation: Actual Output + Production Wastage = Planned Quantity
    if (Math.abs((actual + waste) - planned) > 0.001) {
      const err = `Validation failed: Actual Output (${actual}) + Production Wastage (${waste}) = ${actual + waste}, which does not match Planned Quantity (${planned}).`;
      showToast(err, 'error', 'Production Balancing Error');
      throw new Error(err);
    }

    // 2. Find recipe
    const matchedRecipe = recipes.find(r =>
      r.name.toLowerCase() === prodData.recipeName.toLowerCase() ||
      (prodData.recipeId && r.id === prodData.recipeId)
    ) || recipes[0];

    if (!matchedRecipe || !matchedRecipe.ingredients || matchedRecipe.ingredients.length === 0) {
      const err = `Recipe formula not found for ${prodData.recipeName}.`;
      showToast(err, 'error', 'Recipe Error');
      throw new Error(err);
    }

    // 3. Calculate all required recipe ingredients & check available stock
    const requirements = [];
    const shortages = [];

    for (const formulaIng of matchedRecipe.ingredients) {
      const ing = ingredients.find(i =>
        (formulaIng.ingredientId && i.id === formulaIng.ingredientId) ||
        (i.name.toLowerCase() === formulaIng.name.toLowerCase())
      );

      if (!ing) {
        shortages.push(`${formulaIng.name}: Ingredient not tracked in inventory.`);
        continue;
      }

      // Quantity per portion (e.g. "150 g", "1 pcs", "20 ml")
      const parts = String(formulaIng.quantity).trim().split(/\s+/);
      const portionQty = parseFloat(parts[0]) || 1;
      const portionUnit = parts[1] || ing.stockUnit;

      let totalDeduction = portionQty * planned;
      if (portionUnit === 'g' && ing.stockUnit === 'kg') {
        totalDeduction = totalDeduction / 1000;
      } else if (portionUnit === 'ml' && ing.stockUnit === 'L') {
        totalDeduction = totalDeduction / 1000;
      }
      totalDeduction = Math.round(totalDeduction * 1000) / 1000;

      const available = ing.currentStock;

      if (available < totalDeduction) {
        const shortageAmount = Math.round((totalDeduction - available) * 1000) / 1000;
        shortages.push(`${ing.name}\nRequired: ${totalDeduction} ${ing.stockUnit}\nAvailable: ${available} ${ing.stockUnit}\nShortage: ${shortageAmount} ${ing.stockUnit}`);
      }

      requirements.push({
        ingredientId: ing.id,
        name: ing.name,
        stockUnit: ing.stockUnit,
        requiredQty: totalDeduction
      });
    }

    // If ANY required ingredient is insufficient: DO NOT finalize production!
    if (shortages.length > 0) {
      const shortageMessage = `Insufficient ingredient stock for production:\n\n${shortages.join('\n\n')}`;
      showToast(`Cannot finalize production: ${shortages.length} shortage(s) detected.`, 'error', 'Stock Shortage');
      const err = new Error(shortageMessage);
      err.shortages = shortages;
      throw err;
    }

    // 4. Production fully succeeds: deduct ingredients atomically across locations
    const batchId = prodData.id || prodData.batchNumber || 'PB-1025';
    const prodLocation = prodData.location || 'Kitchen Prep';
    const nowIso = new Date().toISOString();
    const newMovements = [];

    setBalances(prev => {
      let updated = [...prev];
      requirements.forEach(req => {
        let remainingToDeduct = req.requiredQty;

        // Deduct prioritizing production location, then any location with stock
        const locPriority = [
          prodLocation,
          ...STORAGE_LOCATIONS.filter(l => l !== prodLocation)
        ];

        for (const loc of locPriority) {
          if (remainingToDeduct <= 0) break;
          const idx = updated.findIndex(b => b.ingredientId === req.ingredientId && b.location === loc);
          if (idx >= 0 && updated[idx].quantity > 0) {
            const currentLocStock = Number(updated[idx].quantity) || 0;
            const deduct = Math.min(currentLocStock, remainingToDeduct);
            if (deduct > 0) {
              const newQty = Math.round((currentLocStock - deduct) * 1000) / 1000;
              updated[idx] = { ...updated[idx], quantity: newQty };
              remainingToDeduct = Math.round((remainingToDeduct - deduct) * 1000) / 1000;

              newMovements.push({
                id: `mov-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                type: 'PRODUCTION_CONSUMPTION',
                ingredientId: req.ingredientId,
                location: loc,
                quantity: -deduct,
                date: nowIso,
                reference: batchId,
                notes: `Batch ${batchId} consumed for ${prodData.recipeName}`
              });
            }
          }
        }
      });
      return updated;
    });

    setMovements(prev => [...newMovements, ...prev]);

    // 5. Record production record
    const newPrd = {
      id: batchId,
      recipeName: prodData.recipeName,
      recipeId: matchedRecipe.id,
      plannedQuantity: planned,
      actualOutput: actual,
      productionWastage: waste,
      batchSize: `${planned} pcs`,
      yieldPortions: `${actual} pcs`,
      location: prodLocation,
      producedBy: currentUser.name,
      date: nowIso.split('T')[0],
      displayDate: 'Today, Just now',
      status: 'Completed',
      notes: prodData.notes || ''
    };
    setProductions(prev => [newPrd, ...prev.filter(p => p.id !== batchId)]);

    // 6. Record production wastage exactly ONCE if waste > 0
    if (waste > 0) {
      const wasteCost = Math.round(waste * (matchedRecipe.cost || 200));
      const wasteEntry = {
        id: `WST-${2042 + wastage.length}`,
        ingredientName: `${prodData.recipeName} (Batch Loss)`,
        quantity: waste,
        unit: 'pcs',
        reason: 'Kitchen production yield shortfall',
        category: 'Kitchen Prep',
        cost: wasteCost,
        location: prodLocation,
        recordedBy: currentUser.name,
        date: nowIso,
        displayDate: 'Today, Just now',
        notes: `Production batch ${batchId} recorded ${waste} pcs wastage during cooking.`
      };
      setWastage(prev => [wasteEntry, ...prev]);
    }

    showToast(`Production batch ${batchId} recorded successfully!`, 'success', 'Production Logged');
    addActivity(`Production batch recorded · ${prodData.recipeName} (${actual} pcs)`, 'primary');
    return newPrd;
  };

  // 9. Staff Directory
  const addStaff = (staffData) => {
    const id = `stf-${Date.now()}`;
    const initials = (staffData.name || '')
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'ST';

    const newStaff = {
      id,
      ...staffData,
      initials,
      joinedDate: 'Just now',
      status: 'Active'
    };

    setStaff(prev => [newStaff, ...prev]);
    showToast(`Team member ${newStaff.name} added`, 'success');
    addActivity(`Staff member added · ${newStaff.name}`, 'primary');
    return newStaff;
  };

  const updateStaffMember = (id, updates) => {
    setStaff(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
    showToast('Staff member updated successfully', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentBranch,
        currentUser,
        ingredients,
        rawIngredients,
        setRawIngredients,
        setIngredients: setRawIngredients,
        inventoryBalances: balances,
        balances,
        setBalances,
        inventoryMovements: movements,
        movements,
        STORAGE_LOCATIONS,
        getLocationStock,
        getTotalIngredientStock,
        getIngredientBalances,
        stockCounts,
        wastage,
        transfers,
        purchases,
        suppliers,
        recipes,
        productions,
        staff,
        settings,
        setSettings,
        activity,
        selectedIngredientId,
        setSelectedIngredientId,
        selectedStockCountId,
        setSelectedStockCountId,
        selectedWastageId,
        setSelectedWastageId,
        selectedTransferId,
        setSelectedTransferId,
        selectedPurchaseId,
        setSelectedPurchaseId,
        selectedSupplierId,
        setSelectedSupplierId,
        selectedRecipeId,
        setSelectedRecipeId,
        toast,
        showToast,
        hideToast,
        addIngredient,
        updateIngredient,
        addStock,
        recordWastage,
        startStockCount,
        updateStockCountItem,
        finalizeStockCount,
        createTransfer,
        updateTransferStatus,
        createPurchase,
        receivePurchase,
        addSupplier,
        addRecipe,
        recordProduction,
        addStaff,
        updateStaffMember
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
