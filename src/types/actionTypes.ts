import type { TProduct } from "./appTypes"

export type ActionTypes =
  | { type: 'LOAD_DATA'; payload: Array<TProduct> }
  | { type: 'LOAD_SEARCH_DATA'; payload: Array<TProduct> | null }