import { ShowProducts } from '../components/ShowProducts'
import { Header } from '../components/Header'
import { ProductSort } from '../components/ProductSort'
import { ProductSearchInput } from '../components/ProductSearchInput'
import React from 'react'
import debounce from 'lodash/debounce'
import { useAppContext } from '../store/store'

export function Home() {
    const { state, dispatch } = useAppContext()
    const [searchTerm, setSearchTerm] = React.useState('')

    const updateSearchData = () => {
        dispatch({
            type: "LOAD_SEARCH_DATA", payload: state.data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })
    }

    const debounceSearch = debounce(updateSearchData, 300)

    React.useEffect(() => {
        if (searchTerm.length > 0) {
            debounceSearch()
        } else {
            dispatch({ type: 'LOAD_SEARCH_DATA', payload: null })
        }
    }, [searchTerm])

    return (
        <div data-testid='home' className='container'>
            <Header />
            <div className="product-root">
                <ProductSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <ProductSort />
                <ShowProducts />
            </div>
        </div>
    )
}
