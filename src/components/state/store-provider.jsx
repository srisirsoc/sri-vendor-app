'use client';
import React, { createContext, useReducer, useEffect } from 'react';
import { Initials, Reducers } from './reducer';

export const Context = createContext(null);
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducers, Initials);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default StoreProvider;