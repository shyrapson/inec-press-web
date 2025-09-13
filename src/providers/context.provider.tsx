'use client'

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IStore, IStoreContext, IUser } from '../common/types'

export const initialState: IStore = {
  auth: {
    currentUser: null,
    token: null,
  },
}

export const StoreContext = createContext<IStoreContext | null>(null)

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<IStore>(initialState)

  useEffect(() => {
    // TODO: pick auth data from localstorage
  }, [])

  const updateStore = useCallback((payload: Partial<IStore>) => {
    setStore(prev => ({ ...prev, ...payload }))
    const payloadArray = Object.entries(payload)

    payloadArray.forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      store,
      updateStore,
    }),
    [store, updateStore]
  )

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default Context
