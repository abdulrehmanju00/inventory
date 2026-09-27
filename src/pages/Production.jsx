import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';

export default function Production({ onNavigate }) {
  const { currentBranch, productions, showToast } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = productions.filter(p =>
    p.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-16">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant mb-space-sm">
        <span onClick={() => onNavigate('dashboard')} className="hover:text-on-surface transition-colors cursor-pointer">Operations</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-semibold">Production</span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <h1 className="font-display-lg text-display-lg font-semibold tracking-tight text-on-surface leading-tight mb-1">
            Kitchen Production
          </h1>
          <p className="font-body-lg text-body-lg text-secondary">
            Log prep batches, bulk marinades, sauces, and dough production in {currentBranch}.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={() => showToast('Production log exported to CSV', 'success')}
            className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-lowest text-on-surface rounded-lg shadow-sm border border-outline-variant/40 hover:bg-surface-container-low transition-all font-label-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
            <span>Export</span>
          </button>
          <button
            onClick={() => onNavigate('record-production')}
            className="flex items-center gap-space-xs px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg shadow-sm transition-all font-label-md font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span>Record Production</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-space-lg">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Completed Prep Batches</span>
          <span className="font-headline-xl font-bold text-on-surface mt-1 font-numeric-table">
            {productions.filter(p => p.status === 'Completed').length}
          </span>
          <span className="text-xs text-on-surface-variant mt-2">Ready for service line</span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">In Prep Now</span>
          <span className="font-headline-xl font-bold text-amber-700 mt-1 font-numeric-table">
            {productions.filter(p => p.status === 'In Progress').length}
          </span>
          <span className="text-xs text-on-surface-variant mt-2">Active kitchen batching</span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Shift Supervisor</span>
          <span className="font-headline-xl font-bold text-on-surface mt-1">Ahmed Raza</span>
          <span className="text-xs text-on-surface-variant mt-2">Operations Lead</span>
        </div>
      </div>

      {/* PRODUCTION TABLE */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-md border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <h2 className="font-headline-md font-semibold text-on-surface">Batch Log</h2>
          <div className="relative w-48 sm:w-60">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search batch..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Recipe Formula</th>
                <th className="py-3 px-4 font-semibold text-right">Batch Weight</th>
                <th className="py-3 px-4 font-semibold text-right">Yield Portions</th>
                <th className="py-3 px-4 font-semibold">Storage Destination</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold">Prepared By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm">
              {filtered.map(prd => (
                <tr key={prd.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3.5 px-4 font-mono font-semibold text-primary">{prd.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-on-surface">
                    {prd.recipeName}
                    <span className="block text-xs font-normal text-on-surface-variant">{prd.displayDate}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-numeric-table font-semibold text-on-surface">{prd.batchSize}</td>
                  <td className="py-3.5 px-4 text-right font-numeric-table text-on-surface font-medium">{prd.yieldPortions}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{prd.location}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      prd.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${prd.status === 'In Progress' ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                      {prd.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{prd.producedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
