import { actionCreator } from '../utils'

export const ADD_COIN_QUOTE = 'ADD_COIN_QUOTE'
export const addCoinQuote = (payload) => actionCreator(ADD_COIN_QUOTE, { payload })

export const REMOVE_COIN_QUOTE = 'REMOVE_COIN_QUOTE'
export const removeCoinQuote = (payload) => actionCreator(REMOVE_COIN_QUOTE, { payload })