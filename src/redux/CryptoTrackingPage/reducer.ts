import {
  SELECT_CRYPTO_ID,
  DELETE_COIN_ID,
  SET_SELECTED_COIN_IDS,
  } from './actions'
import { IState } from 'types/cryptoTracking'
import produce from 'immer'

const initialState = {
  selectedCryptoIds: {}
}

const cryptoTrackingReducer = (state: IState = initialState, action: any) => (
  produce(state, draft => {
    const { payload } = action
    switch(action.type) {
      case SET_SELECTED_COIN_IDS:
        draft.selectedCryptoIds =
          payload.cryptoIds.reduce((acc: { [key: number]: boolean }, id: number) => {
            acc[id] = true
            return acc
          }, {})
        break
      case SELECT_CRYPTO_ID:
        draft.selectedCryptoIds[payload.cryptoId] = true
        break
      case DELETE_COIN_ID:
        delete draft.selectedCryptoIds[payload.cryptoId]
        break
    }
  })
)

export default cryptoTrackingReducer
