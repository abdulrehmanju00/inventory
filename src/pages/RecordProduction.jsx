import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';

export default function RecordProduction({ onNavigate }) {
  const { currentBranch, recipes, ingredients, recordProduction } = useAppStore();

  const [batchId, setBatchId] = useState('PB-1025');
  const [recipeName, setRecipeName] = useState(recipes[0]?.name || 'Grilled Chicken Burger');
  const [plannedQty, setPlannedQty] = useState('100');
  const [actualOutput, setActualOutput] = useState('95');
  const [wastageQty, setWastageQty] = useState('5');
  const [location, setLocation] = useState('Kitchen Prep');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedRecipe = recipes.find(r => r.name === recipeName) || recipes[0];

  const plannedNum = parseFloat(plannedQty) || 0;
  const actualNum = parseFloat(actualOutput) || 0;
  const wasteNum = parseFloat(wastageQty) || 0;

  const isBalanced = Math.abs((actualNum + wasteNum) - plannedNum) < 0.001;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (plannedNum <= 0) {
      setErrorMsg('Planned quantity must be greater than zero.');
      return;
    }

    if (!isBalanced) {
      setErrorMsg(
        `Validation failed: Actual Output (${actualNum}) + Production Wastage (${wasteNum}) = ${actualNum + wasteNum}, which does not match Planned Quantity (${plannedNum}).`
      );
      return;
    }

    try {
      recordProduction({
        id: batchId.trim() || undefined,
        recipeName,
        plannedQuantity: plannedNum,
        actualOutput: actualNum,
        productionWastage: wasteNum,
        location,
        notes
      });
      onNavigate('production');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col pb-16">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant mb-space-sm">
        <span onClick={() => onNavigate('dashboard')} className="hover:text-on-surface transition-colors cursor-pointer">Operations</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span onClick={() => onNavigate('production')} className="hover:text-on-surface transition-colors cursor-pointer">Production</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-semibold">Record Batch</span>
      </nav>

      {/* HEADER */}
      <div className="mb-space-lg">
        <h1 className="font-display-lg text-display-lg font-semibold tracking-tight text-on-surface leading-tight mb-1">
          Record Kitchen Batch
        </h1>
        <p className="font-body-lg text-body-lg text-secondary">
          Log food production batches and consume ingredient stocks for {currentBranch}.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-space-md p-4 rounded-xl bg-error-container/70 text-on-error-container flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] text-error mt-0.5">error</span>
          <div className="flex-1 text-body-sm font-medium">{errorMsg}</div>
          <button onClick={() => setErrorMsg('')} type="button" className="text-on-error-container/70 hover:text-on-error-container">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30 space-y-6">
          {/* Batch Code and Recipe formula selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-1">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">
                Batch Code <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="e.g., PB-1025"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">
                Recipe Formula <span className="text-error">*</span>
              </label>
              <select
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {recipes.map(r => (
                  <option key={r.id} value={r.name}>{r.name} ({r.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Recipe ingredients consumption preview */}
          {selectedRecipe && selectedRecipe.ingredients && (
            <div className="p-3.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/30 space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant block">
                Standard Ingredients Consumed (Per Portion)
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedRecipe.ingredients.map((it, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface">
                    <strong>{it.name}:</strong> {it.quantity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Three-Way Quantity Balance: Planned = Actual Output + Wastage */}
          <div className="space-y-3 p-4 rounded-xl bg-surface-container-low/40 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Production Quantity Reconciliation
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Actual Output + Wastage = Planned Quantity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface block">
                  1. Planned Quantity <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={plannedQty}
                    onChange={(e) => setPlannedQty(e.target.value)}
                    className="w-full h-10 px-3 font-numeric-table rounded-lg bg-surface-container-lowest text-on-surface font-bold border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-medium pointer-events-none">
                    portions
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block">Target batch goal</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-tertiary-container block">
                  2. Actual Output Yield <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={actualOutput}
                    onChange={(e) => setActualOutput(e.target.value)}
                    className="w-full h-10 px-3 font-numeric-table rounded-lg bg-surface-container-lowest text-on-surface font-bold border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-medium pointer-events-none">
                    portions
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block">Successful yield</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-error block">
                  3. Production Wastage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={wastageQty}
                    onChange={(e) => setWastageQty(e.target.value)}
                    className="w-full h-10 px-3 font-numeric-table rounded-lg bg-surface-container-lowest text-on-surface font-bold border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-medium pointer-events-none">
                    portions
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block">Trimmings / errors</span>
              </div>
            </div>

            {/* Validation Banner */}
            <div className={`p-3 rounded-lg flex items-center justify-between text-xs font-semibold ${
              isBalanced ? 'bg-emerald-50 text-tertiary-container border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  {isBalanced ? 'check_circle' : 'warning'}
                </span>
                <span>
                  {isBalanced
                    ? `Balanced: ${actualNum} (Actual) + ${wasteNum} (Wastage) = ${plannedNum} (Planned)`
                    : `Unbalanced: ${actualNum} + ${wasteNum} = ${actualNum + wasteNum} (Must equal ${plannedNum})`
                  }
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWastageQty(String(Math.max(0, plannedNum - actualNum)))}
                className="underline hover:no-underline"
              >
                Auto-balance waste
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md font-semibold text-on-surface">Storage Destination Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="Kitchen Prep">Kitchen Prep Station Chiller</option>
              <option value="Walk-in Cooler">Walk-in Cooler</option>
              <option value="Main Store">Main Store</option>
              <option value="Dry Store">Dry Store</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-md text-label-md font-semibold text-on-surface">Quality & Expiry Label Notes</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Expiry label printed for 5 days. Quality and consistency approved by head chef."
              className="w-full p-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate('production')}
            className="h-10 px-5 rounded-lg border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-label-md font-medium transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Save Batch Production & Deduct Ingredients
          </button>
        </div>
      </form>
    </div>
  );
}
