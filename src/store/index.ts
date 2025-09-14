// store/index.ts
import { createStore } from "redux";

// Types
export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Redux Actions
export const LOGIN = 'LOGIN' as const;
export const LOGOUT = 'LOGOUT' as const;

export interface LoginAction {
  type: typeof LOGIN;
  payload: User;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

// Action Creators
export const login = (user: User): LoginAction => ({
  type: LOGIN,
  payload: user
});

export const logout = (): LogoutAction => ({
  type: LOGOUT
});

// Redux Reducer
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authReducer = (
  state: AuthState = initialState, 
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

// Create Redux store
export const store = createStore(
  authReducer,
  // Add Redux DevTools Extension support
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// Export types for use in components
export type RootState = AuthState;
export type AppDispatch = typeof store.dispatch;

// Default export the store
export default store;