import { actionCreator } from '../utils'


export const SET_SELECTED_COIN_IDS = 'setSelectedCoins'
export const setSelectedCoinIds = (payload) => actionCreator(SET_SELECTED_COIN_IDS, { payload })


export const SELECT_COIN_ID = 'selectCoinId'
export const selectCoinId = (payload) => actionCreator(SELECT_COIN_ID, { payload })

export const DELETE_COIN_ID = 'deleteCoinId'
export const deleteCoinId = (payload) => actionCreator(DELETE_COIN_ID, { payload })