// Shared React context that replaces Zustand for this SPA.
// Defined in its own file to avoid circular-import issues between App.jsx and authStore.js.
import { createContext, useContext } from 'react';

export const AuthCtx = createContext(null);
export const useAuthStore = () => useContext(AuthCtx);
