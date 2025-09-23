"use client";

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IAuth, IRegisteredUser, IStore, IStoreContext } from "../common/types";
import { useRouter } from "next/navigation";

export const initialState: IStore = {
  auth: null,
  registeredUser: null,
  isLocalStorageLoaded: false,
};

export const StoreContext = createContext<IStoreContext | null>(null);

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<IStore>(initialState);
  const router = useRouter();

  const updateStore = useCallback((payload: Partial<IStore>) => {
    setStore((prev) => ({ ...prev, ...payload }));
    const payloadArray = Object.entries(payload);

    payloadArray.forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, []);

  const handleLogOut = () => {
    updateStore({
      auth: null,
      registeredUser: null,
      isLocalStorageLoaded: false,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("registeredUser");
    router.push("/login");
  };

  useEffect(() => {
    // TODO: abstract as a generic function
    const authData = localStorage.getItem("auth");
    console.log({ authData: JSON.parse(authData!) });
    const auth = authData ? (JSON.parse(authData) as IAuth) : null;
    const registeredUserData = localStorage.getItem("registeredUser");
    const registeredUser = registeredUserData
      ? (JSON.parse(registeredUserData) as IRegisteredUser)
      : null;

    if (auth) {
      updateStore({ auth });
    }
    if (registeredUser) {
      updateStore({ registeredUser });
    }
    updateStore({ isLocalStorageLoaded: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({
      store,
      updateStore,
      handleLogOut,
    }),
    [store, updateStore]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default Context;
