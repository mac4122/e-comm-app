import type { ActionTypes } from "../types/actionTypes"
import type { AppState } from "../types/appTypes"

export const initialState: AppState = {
    data: [],
    searchData: null,
  }
  
  export function appReducer(state: AppState, action: ActionTypes): AppState {
    switch (action.type) {
        case 'LOAD_DATA':
          return { ...state, data: action.payload}
        case 'LOAD_SEARCH_DATA':
          return { ...state, searchData: action.payload }
        default:
          return state;
      }
  }