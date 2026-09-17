'use client';

import { ActivityRecord } from '@/types/patient';
import { DEMO_PATIENT, DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';
import { DailyRoutineItem } from '@/types/caregiver';

export interface SyncQueueItem {
  id: string;
  type: 'activity_completed' | 'routine_checked' | 'memory_noted';
  payload: ActivityRecord | DailyRoutineItem | Record<string, unknown>;
  createdAt: string;
  status: 'pending' | 'syncing' | 'synced';
}

const STORAGE_KEYS = {
  ACTIVITIES: 'cogniva_activities',
  SYNC_QUEUE: 'cogniva_sync_queue',
  SIMULATED_OFFLINE: 'cogniva_simulated_offline',
  PATIENT_PROFILE: 'cogniva_patient_profile',
  ROUTINE: 'cogniva_routine',
};

export class OfflineStorageManager {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static isSimulatedOffline(): boolean {
    if (!this.isClient()) return false;
    return localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE) === 'true';
  }

  static setSimulatedOffline(offline: boolean): void {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, offline ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('cogniva-network-change', { detail: { offline } }));
  }

  static getSyncQueue(): SyncQueueItem[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveSyncQueue(queue: SyncQueueItem[]): void {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    window.dispatchEvent(new CustomEvent('cogniva-sync-updated', { detail: { count: queue.filter(q => q.status === 'pending').length } }));
  }

  static recordActivity(activity: ActivityRecord): void {
    if (!this.isClient()) return;
    
    // Save locally
    const existing = this.getActivities();
    existing.unshift(activity);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(existing));

    // If offline or simulated offline, enqueue for sync
    const isOffline = !navigator.onLine || this.isSimulatedOffline();
    const queue = this.getSyncQueue();
    
    queue.push({
      id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: 'activity_completed',
      payload: activity,
      createdAt: new Date().toISOString(),
      status: isOffline ? 'pending' : 'synced'
    });

    this.saveSyncQueue(queue);
  }

  static getActivities(): ActivityRecord[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static async syncPendingQueue(): Promise<number> {
    if (!this.isClient()) return 0;
    const queue = this.getSyncQueue();
    const pending = queue.filter(item => item.status === 'pending');
    
    if (pending.length === 0) return 0;

    // Transition to syncing
    queue.forEach(item => {
      if (item.status === 'pending') item.status = 'syncing';
    });
    this.saveSyncQueue(queue);

    // Simulate network server handshake
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Mark all as synced
    queue.forEach(item => {
      item.status = 'synced';
    });
    this.saveSyncQueue(queue);

    return pending.length;
  }

  static getRoutine(): DailyRoutineItem[] {
    if (!this.isClient()) return DEMO_ROUTINE;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROUTINE);
      return data ? JSON.parse(data) : DEMO_ROUTINE;
    } catch {
      return DEMO_ROUTINE;
    }
  }

  static toggleRoutineItem(id: string): void {
    if (!this.isClient()) return;
    const routine = this.getRoutine();
    const updated = routine.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCompletedToday: !item.isCompletedToday,
          completedAt: !item.isCompletedToday ? new Date().toISOString() : undefined
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.ROUTINE, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cogniva-routine-changed'));
  }
}
