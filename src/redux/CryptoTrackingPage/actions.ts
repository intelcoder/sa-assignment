import { actionCreator } from '../utils'


export const SET_SELECTED_COIN_IDS = 'setSelectedCoins'
export const setSelectedCryptoIds = (payload: { cryptoIds: number[]}) =>
  actionCreator(SET_SELECTED_COIN_IDS, { payload })


export const SELECT_CRYPTO_ID = 'selectCryptoId'
export const selectCryptoId = (payload: { cryptoId: number }) =>
  actionCreator(SELECT_CRYPTO_ID, { payload })

export const DELETE_COIN_ID = 'deleteCryptoId'
export const deleteCryptoId = (payload: { cryptoId: number }) =>
  actionCreator(DELETE_COIN_ID, { payload })

