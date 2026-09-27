import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';
import { formatCurrency } from '../utils/formatting';
import { computeInventoryMetrics } from '../utils/inventory';

export default function Reports({ onNavigate }) {
  const { currentBranch, ingredients, wastage, purchases, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState('valuation');

  const metrics = computeInventoryMetrics(ingredients);
  const totalWastage = wastage.reduce((acc, w) => acc + (Number(w.cost) || 0), 0);
  const totalPurchases = purchases.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0);

  // Category breakdown
  const categoryBreakdown = {};
  ingredients.forEach(item => {
    const val = item.currentStock * item.unitCost;
    categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + val;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant mb-space-sm">
        <span onClick={() => onNavigate('dashboard')} className="hover:text-on-surface transition-colors cursor-pointer">Management</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-semibold">Reports & Analytics</span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <h1 className="font-display-lg text-display-lg font-semibold tracking-tight text-on-surface leading-tight mb-1">
            Operational Reports
          </h1>
          <p className="font-body-lg text-body-lg text-secondary">
            Financial analytics, stock valuation, shrinkage, and vendor spend for {currentBranch}.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={() => showToast('Report package exported to PDF', 'success')}
            className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-lowest text-on-surface rounded-lg shadow-sm border border-outline-variant/40 hover:bg-surface-container-low transition-all font-label-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">picture_as_pdf</span>
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => showToast('Full ERP data sheet exported to Excel/CSV', 'success')}
            className="flex items-center gap-space-xs px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg shadow-sm transition-all font-label-md font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3 SUMMARY KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-space-lg">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Current Inventory Value</span>
          <span className="font-headline-xl font-bold text-on-surface tracking-tight mt-1 font-numeric-table">
            {formatCurrency(metrics.totalValue)}
          </span>
          <span className="text-xs text-on-surface-variant mt-2">{metrics.totalItems} catalog items active</span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Logged Food Wastage</span>
          <span className="font-headline-xl font-bold text-error tracking-tight mt-1 font-numeric-table">
            {formatCurrency(totalWastage)}
          </span>
          <span className="text-xs text-on-surface-variant mt-2">{wastage.length} recorded incidents</span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Procurement Spend</span>
          <span className="font-headline-xl font-bold text-primary tracking-tight mt-1 font-numeric-table">
            {formatCurrency(totalPurchases)}
          </span>
          <span className="text-xs text-on-surface-variant mt-2">{purchases.length} total purchase orders</span>
        </div>
      </div>

      {/* REPORT TABS */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="border-b border-outline-variant/30 px-space-md pt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('valuation')}
            className={`pb-3 font-label-md text-label-md font-semibold transition-colors border-b-2 ${
              activeTab === 'valuation' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Inventory Valuation by Category
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shrinkage')}
            className={`pb-3 font-label-md text-label-md font-semibold transition-colors border-b-2 ${
              activeTab === 'shrinkage' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Wastage & Loss Trends
          </button>
        </div>

        <div className="p-space-md">
          {activeTab === 'valuation' ? (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm">
                  <thead>
                    <tr className="bg-surface-container-low text-xs text-on-surface-variant uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-semibold">Category Group</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Items Count</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Total Category Value</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Share of Inventory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {Object.entries(categoryBreakdown).map(([cat, val]) => {
                      const count = ingredients.filter(i => i.category === cat).length;
                      const share = metrics.totalValue > 0 ? Math.round((val / metrics.totalValue) * 100) : 0;
                      return (
                        <tr key={cat} className="hover:bg-surface-container-low/40">
                          <td className="py-3 px-4 font-semibold text-on-surface">{cat}</td>
                          <td className="py-3 px-4 text-right font-numeric-table">{count} items</td>
                          <td className="py-3 px-4 text-right font-numeric-table font-semibold text-on-surface">{formatCurrency(val)}</td>
                          <td className="py-3 px-4 text-right font-numeric-table text-primary font-bold">{share}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-body-sm text-on-surface-variant">Breakdown of recent recorded losses by station area:</p>
              <div className="divide-y divide-outline-variant/20 font-body-sm">
                {wastage.map(w => (
                  <div key={w.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-on-surface">{w.ingredientName}</span>
                      <span className="text-xs text-on-surface-variant block">{w.reason} · {w.location}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-numeric-table font-bold text-error block">{formatCurrency(w.cost)}</span>
                      <span className="text-xs text-on-surface-variant">{w.quantity} {w.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
