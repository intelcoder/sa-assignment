import { ADD_COIN_QUOTE, addCoinQuote } from './actions'
import { IState } from './types'

const initialState = {
  quotes: [],
}

const CryptoMarketPageReducer = (state: IState = initialState, action: any) => {
  switch(action.type) {
    case ADD_COIN_QUOTE:
      const { symbol } = action.payload
      return {
        ...state,
        quotes: [
          ...state.quotes,
          action.payload,
        ]

      }
  }
  return initialState
}

export default CryptoMarketPageReducer
