import React from 'react'
import { useAppContext } from '../store/store'

export const ProductSort = () => {
    const [sortBy, setSortBy] = React.useState("")
    const { state: { searchData, data }, dispatch } = useAppContext()

    React.useEffect(() => {
        const sortedData = (searchData ?? data).sort((a, b) => {
            switch (sortBy) {
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "price-asc":
                    return a.actualPrice - b.actualPrice;
                case "price-desc":
                    return b.actualPrice - a.actualPrice;
                default:
                    return 0;
            }
        })
        dispatch({
            type: searchData ? "LOAD_SEARCH_DATA" : "LOAD_DATA", payload: sortedData
        })
    }, [sortBy, searchData])

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label htmlFor='sort-options'>Sort by: </label>
            <select id='sort-options' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="" disabled>None</option>
                <option value="name-asc">Name (Asc)</option>
                <option value="name-desc">Name (Desc)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        </div>
    )
}