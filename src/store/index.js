/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  popular: [],
  selected: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POPULAR':
      return { ...state, popular: action.payload.popular }
    case 'SET_SELECTED': // 今回のように、複数のデータが入る時は必ずスプレッド構文を使って、stateを最初に展開する。
      return { ...state, selected: action.payload.selected } // *これは、reducerでのstate更新は、mergeではなく上書きのため、今回のようにselectedだけを更新したい場合に、stateを展開せずに行うと、popularのデータが消えてしまうため。
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
