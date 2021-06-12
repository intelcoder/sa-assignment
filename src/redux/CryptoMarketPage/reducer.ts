import {
  ADD_COIN_QUOTE,

  REMOVE_COIN_QUOTE
  } from './actions'
import { IState } from './types'
import produce from 'immer'

const initialState = {
  quotes: new Map()
}

const CryptoMarketPageReducer = (state: IState = initialState, action: any) => {
  switch(action.type) {
    case ADD_COIN_QUOTE:
      const { symbol } = action.payload
      const quotes = produce(state.quotes, draft => {
        if(!draft.has(symbol) && draft.size < 10) {
          draft.set(symbol, action.payload)
        }
      })
    return {
      ...state,
      quotes
    }
    case REMOVE_COIN_QUOTE:
      const { removeSymbols } = action.payload
      return {
        ...state,
        quotes: (
          produce(state.quotes, draft => {
            for(let symbol in removeSymbols) {
              if(draft.size > 1) draft.delete(symbol)
            }
          })
        )
      }
  }
  return initialState
}

export default CryptoMarketPageReducer
