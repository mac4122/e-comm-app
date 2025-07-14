import { createContext, useContext, useReducer, type ReactNode } from "react"
import { appReducer, initialState } from "../reducer/appReducer"
import type { ActionTypes } from "../types/actionTypes"
import type { AppState } from "../types/appTypes"
import { STORE_DATA } from "../constants/app-constants"

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ActionTypes>
} | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state: { ...state, data: STORE_DATA }, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
