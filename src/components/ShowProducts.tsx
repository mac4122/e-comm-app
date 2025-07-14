import type { TProduct } from "../types/appTypes"
import map from 'lodash/map'
import { useAppContext } from "../store/store"
import { getDiscountPercentage } from "../utils/util"
import React from 'react'
import { useNavigate } from "react-router-dom"

export const ShowProducts = () => {
    const navigate = useNavigate()
    const { state: { data, searchData } } = useAppContext()

    const products = React.useMemo(() => searchData || data, [searchData])

    const goToCheckoutPage = (product: TProduct) => navigate("/checkout", { state: product })

    return (
        <>
            {map(products, (product: TProduct) => (
                <div className='product' key={product.id}>
                    <div className='details'><img src={product.image} loading="lazy" />
                        <div>
                            <h2>{product.name}</h2>
                            <h4>Price - {product.actualPrice} <s>{product.suggestedPrice}</s> ({getDiscountPercentage(product.suggestedPrice, product.actualPrice)}% OFF)</h4>
                            <p>{product.shortDescription}</p>
                        </div>
                    </div>
                    <button onClick={() => goToCheckoutPage(product)}>Buy</button>
                </div>
            ))}
        </>
    )
}