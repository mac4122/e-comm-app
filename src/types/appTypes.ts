export interface AppState {
    data: Array<TProduct>
    searchData: Array<TProduct> | null
}

export interface TProduct {
    id: number
    name: string
    shortDescription: string
    suggestedPrice: number
    actualPrice: number
    image: string
}