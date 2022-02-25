/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  popular: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POPULAR':
      return { popular: action.payload.popular }
    default:
      return state
  }
}

export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null // dispatch関数
})

const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState)
  return ( // Storeは上でexportしているもの。
   <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
  )
}

export default StoreProvider
