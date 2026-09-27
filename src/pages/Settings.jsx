import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';

export default function Settings({ onNavigate }) {
  const { currentBranch, settings, setSettings, showToast } = useAppStore();

  const [form, setForm] = useState({ ...settings });

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(form);
    showToast('Branch settings saved successfully', 'success');
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col pb-16">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant mb-space-sm">
        <span onClick={() => onNavigate('dashboard')} className="hover:text-on-surface transition-colors cursor-pointer">System</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-semibold">Settings</span>
      </div>

      {/* HEADER */}
      <div className="mb-space-lg">
        <h1 className="font-display-lg text-display-lg font-semibold tracking-tight text-on-surface leading-tight mb-1">
          Branch Settings
        </h1>
        <p className="font-body-lg text-body-lg text-secondary">
          Configure operations parameters, local currency, inventory thresholds, and notifications for {currentBranch}.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: BRANCH PROFILE */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30 space-y-4">
          <h2 className="font-headline-md font-semibold text-on-surface pb-2 border-b border-outline-variant/20">
            Branch Profile & Localization
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">Branch Designation</label>
              <input
                type="text"
                value={form.branchName}
                onChange={(e) => setForm({ ...form, branchName: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">Accounting Currency</label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="PKR">PKR (Pakistani Rupee)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="AED">AED (UAE Dirham)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">Regional Timezone</label>
              <input
                type="text"
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">Date Display Format</label>
              <input
                type="text"
                value={form.dateFormat}
                onChange={(e) => setForm({ ...form, dateFormat: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-outline-variant/40"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: INVENTORY THRESHOLDS & ALERTS */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30 space-y-4">
          <h2 className="font-headline-md font-semibold text-on-surface pb-2 border-b border-outline-variant/20">
            Inventory Automation & Alerts
          </h2>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low cursor-pointer">
              <input
                type="checkbox"
                checked={form.emailNotifications}
                onChange={(e) => setForm({ ...form, emailNotifications: e.target.checked })}
                className="mt-1 text-primary focus:ring-0 rounded"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-body-md text-on-surface">Critical Stock Alerts</span>
                <span className="text-xs text-on-surface-variant">
                  Notify Operations Lead (Ahmed Raza) when items fall below 50% of minimum threshold.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low cursor-pointer">
              <input
                type="checkbox"
                checked={form.autoReorderSuggestions}
                onChange={(e) => setForm({ ...form, autoReorderSuggestions: e.target.checked })}
                className="mt-1 text-primary focus:ring-0 rounded"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-body-md text-on-surface">Auto-Suggest Purchase Orders</span>
                <span className="text-xs text-on-surface-variant">
                  Generate draft POs automatically when stock levels hit reorder flag.
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-label-md font-medium transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
