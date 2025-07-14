import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import React from 'react'
import type { TProduct } from "types/appTypes"

export const OrderConfirmation = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const productData: TProduct = location.state

    React.useEffect(() => {
        if (!productData) {
            navigate('/')
        }
    }, [productData, navigate])

    if (!productData) {
        return null
    }

    return (
        <div className='container'>
            <Header />
            <section>
                <h4>{productData.name}</h4>
                <p>{productData.shortDescription}</p>
                <p>you have been charged {productData.actualPrice}</p>
            </section>
        </div>
    )
}