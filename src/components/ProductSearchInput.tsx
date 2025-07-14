import React from 'react'

interface IProductSearchInputProps {
    searchTerm: string
    setSearchTerm: (searchVal: string) => void
}

export const ProductSearchInput: React.FC<IProductSearchInputProps> = ({
    searchTerm,
    setSearchTerm
}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    )
}