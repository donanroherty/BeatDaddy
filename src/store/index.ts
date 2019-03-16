import { droneReducer } from './drone/reducer'
import { IDroneState } from './drone/types'
import { metronomeReducer } from './metronome/reducer'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appReducer } from './app/reducer'
import { IAppState } from './app/types'
import { IMetronomeState } from './metronome/types'

export interface IRootState {
  app: IAppState
  metronome: IMetronomeState
  drone: IDroneState
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({ app: appReducer, metronome: metronomeReducer, drone: droneReducer }),
  composeWithDevTools()
)

export default store
