import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>(
  'LocalStorageToken',
  {
    providedIn: 'root',
    factory: () => (typeof window !== 'undefined' ? window.localStorage : null)
  }
);