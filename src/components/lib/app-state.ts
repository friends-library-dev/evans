import React from 'react';

interface AppState {
  view: 'app' | 'modal:checkout' | 'modal:request-free';
}

export type AppAction = `show--${AppState['view']}`;

export const appInitialState: AppState = { view: `app` };

export const AppDispatch = React.createContext<React.Dispatch<AppAction>>(() => {});

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action) {
    case `show--app`:
      return { view: `app` };
    case `show--modal:checkout`:
      return { view: `modal:checkout` };
    case `show--modal:request-free`:
      return { view: `modal:request-free` };
  }
}
