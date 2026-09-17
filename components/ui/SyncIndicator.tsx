'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { OfflineStorageManager, SyncQueueItem } from '@/lib/storage/indexed-db';

export const SyncIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [justSynced, setJustSynced] = useState(false);

  useEffect(() => {
    const checkState = () => {
      const simulated = OfflineStorageManager.isSimulatedOffline();
      const realOffline = !navigator.onLine;
      setIsOffline(simulated || realOffline);

      const queue = OfflineStorageManager.getSyncQueue();
      const pending = queue.filter(item => item.status === 'pending').length;
      setPendingCount(pending);
    };

    checkState();

    const handleNetworkChange = () => checkState();
    const handleSyncUpdated = (e: any) => {
      setPendingCount(e.detail?.count ?? 0);
    };

    window.addEventListener('online', checkState);
    window.addEventListener('offline', checkState);
    window.addEventListener('cogniva-network-change', handleNetworkChange);
    window.addEventListener('cogniva-sync-updated', handleSyncUpdated);

    return () => {
      window.removeEventListener('online', checkState);
      window.removeEventListener('offline', checkState);
      window.removeEventListener('cogniva-network-change', handleNetworkChange);
      window.removeEventListener('cogniva-sync-updated', handleSyncUpdated);
    };
  }, []);

  const handleManualSync = async () => {
    if (isOffline || isSyncing) return;
    setIsSyncing(true);
    const count = await OfflineStorageManager.syncPendingQueue();
    setIsSyncing(false);
    setJustSynced(true);
    setPendingCount(0);
    setTimeout(() => setJustSynced(false), 3000);
  };

  if (isOffline) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAECE7] border border-[#F6CBC0] text-[#B85D43] text-xs font-semibold shadow-xs">
        <WifiOff className="w-3.5 h-3.5" />
        <span>Offline Mode</span>
        {pendingCount > 0 && (
          <span className="bg-[#B85D43] text-white px-1.5 py-0.2 rounded-full text-[10px]">
            {pendingCount} saved
          </span>
        )}
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF6E7] border border-[#F8D5C2] text-[#D9A036] text-xs font-semibold shadow-xs">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Syncing data...</span>
      </div>
    );
  }

  if (justSynced || pendingCount === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF2EC] border border-[#C5DBCB] text-[#3F5E47] text-xs font-semibold shadow-xs">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>All Activities Synced</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleManualSync}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF6E7] border border-[#F8D5C2] text-[#D9A036] hover:bg-[#FDF1EA] text-xs font-semibold cursor-pointer shadow-xs transition-colors"
    >
      <RefreshCw className="w-3.5 h-3.5" />
      <span>{pendingCount} waiting to sync</span>
    </button>
  );
};
