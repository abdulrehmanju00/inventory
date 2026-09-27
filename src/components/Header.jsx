import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';

export default function Header({ onOpenMobile, onNavigate }) {
  const { currentBranch, currentUser, ingredients, showToast } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredQuickResults = searchTerm.trim()
    ? ingredients.filter(i =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectResult = (ing) => {
    setSearchTerm('');
    setSearchFocused(false);
    onNavigate('ingredient-detail');
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/95 backdrop-blur border-b border-outline-variant/40 z-30 px-4 lg:px-gutter-lg flex items-center justify-between">
      {/* Left side: Mobile menu toggle + Branch Selector + Updated status */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        <button
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
          onClick={onOpenMobile}
          type="button"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div
          className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors"
          onClick={() => onNavigate('settings')}
          title="Branch settings"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
          <span className="font-label-md text-label-md text-on-surface font-medium">{currentBranch}</span>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-label-sm">Updated 2 min ago</span>
        </div>
      </div>

      {/* Right side: Search, Notifications, Help, User Profile */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-96">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search ingredients, purchases, suppliers (⌘K)"
            className="w-full h-9 pl-9 pr-12 rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/70 font-body-sm text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm pointer-events-none">
            ⌘K
          </div>

          {/* Quick Search Popover */}
          {searchFocused && filteredQuickResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-lg p-2 z-50">
              <div className="text-[11px] font-semibold text-on-surface-variant uppercase px-2 py-1">
                Ingredients Matching "{searchTerm}"
              </div>
              {filteredQuickResults.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">{item.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{item.category} • {item.location}</span>
                  </div>
                  <span className="font-numeric-table font-semibold text-body-sm text-on-surface">
                    {item.currentStock} {item.stockUnit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications and Help */}
        <div className="flex items-center gap-space-xs relative">
          <button
            type="button"
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <span className="font-label-md text-label-md font-semibold text-on-surface">Active Alerts</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                  3 New
                </span>
              </div>
              <div className="divide-y divide-outline-variant/20 max-h-64 overflow-y-auto mt-2">
                <div
                  className="py-2 cursor-pointer hover:bg-surface-container-low px-1 rounded transition-colors"
                  onClick={() => { setShowNotifications(false); onNavigate('inventory'); }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-md text-label-md font-medium text-on-surface">Chicken Breast is Critical</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">8 kg remaining · Min required is 20 kg</p>
                </div>
                <div
                  className="py-2 cursor-pointer hover:bg-surface-container-low px-1 rounded transition-colors"
                  onClick={() => { setShowNotifications(false); onNavigate('purchases'); }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="font-label-md text-label-md font-medium text-on-surface">PO-8821 Ready for Receiving</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">Fresh Foods Supplier delivery is waiting</p>
                </div>
                <div
                  className="py-2 cursor-pointer hover:bg-surface-container-low px-1 rounded transition-colors"
                  onClick={() => { setShowNotifications(false); onNavigate('stock-counts'); }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-label-md text-label-md font-medium text-on-surface">Count CNT-1047 In Progress</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">Walk-in Cooler physical audit underway</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => showToast('Help documentation: Restaurant Operations Guide v2.4', 'success', 'Documentation')}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            title="Help & Documentation"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
        </div>

        <div className="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>

        {/* User avatar and profile trigger */}
        <div
          onClick={() => onNavigate('staff')}
          className="flex items-center gap-space-xs cursor-pointer group"
          title={`${currentUser.name} (${currentUser.role})`}
        >
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-on-surface font-label-sm font-semibold">
            {currentUser.initials}
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface transition-colors hidden sm:inline">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </header>
  );
}
