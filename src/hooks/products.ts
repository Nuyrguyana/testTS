import { useEffect, useState } from "react";
import { IProducts } from "../model";
import axios, { AxiosError } from "axios";

export const useProducts = () => {
    const [products, setProducts] = useState<IProducts[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const addProduct = (product: IProducts) => {
        setProducts(prev => [... prev, product])
    }

    async function fetchProducts() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<IProducts[]>('https://fakestoreapi.com/products?limit=5')
            setProducts(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, error, loading, addProduct }
}