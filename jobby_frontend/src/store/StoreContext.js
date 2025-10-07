import React, { createContext, useContext } from 'react';
import RootStore from './RootStore';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={RootStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export default StoreContext;
