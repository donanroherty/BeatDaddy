import { IAppState, Constants, AppActions } from './types'

const init: IAppState = {
  isPlaying: false,
  timeSigMenuVisible: false,
  audioMenuVisible: false
}

export const appReducer = (state: IAppState = init, action: AppActions): IAppState => {
  switch (action.type) {
    case Constants.SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload.value }

    case Constants.TOGGLE_IS_PLAYING:
      return { ...state, isPlaying: !state.isPlaying }

    case Constants.SET_TIME_SIG_MENU_VISIBLE:
      return { ...state, timeSigMenuVisible: action.payload.value }

    case Constants.SET_AUDIO_MENU_VISIBLE:
      return { ...state, audioMenuVisible: action.payload.value }
    default:
      return state
  }
}
