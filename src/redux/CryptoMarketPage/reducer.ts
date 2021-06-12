import {
  SELECT_COIN_ID,
  DELETE_COIN_ID,
  SET_SELECTED_COIN_IDS,
  } from './actions'
import { IState } from './types'
import produce from 'immer'

const initialState = {
  selectedCoinIds: {}
}

const CryptoMarketPageReducer = (state: IState = initialState, action: any) => (
  produce(state, draft => {
    const { payload } = action
    switch(action.type) {
      case SET_SELECTED_COIN_IDS:
        draft.selectedCoinIds = payload.coinIds
        break
      case SELECT_COIN_ID:
        draft.selectedCoinIds[payload.coinId] = true

        break
      case DELETE_COIN_ID:
        delete draft.selectedCoinIds[payload.coinId]
        break
    }
  })
)

export default CryptoMarketPageReducer
