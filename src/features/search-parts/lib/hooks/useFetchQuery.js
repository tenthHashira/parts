import { useState, useEffect } from 'react'

// Так как key захардкожен то хранится публично
const KEY = '00000000-0000-0000-0000-000000000001'
const URL = 'https://api.favorit-parts.ru/hs/hsprice/'

export const useFetchQuery = (query, brand) => {
    const [parts, setParts] = useState([])
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isBrandNotFound, setIsBrandNotFound] = useState(false)

    useEffect(() => {
        if(!query) {
            setParts([])
            setBrands([])
            setIsLoading(false)
            setError(null)
            setIsBrandNotFound(false)
            return
        }
        const controller = new AbortController()

        const load = async () => {
            setIsLoading(true)
            setError(null)
            setIsBrandNotFound(false)
            
            try {   
                const params = new URLSearchParams({
                    key: KEY,
                    number: query,
                })

                if (brand) {
                    params.set('brand', brand)
                    params.set('analogues', 'on')
                }

                const response = await fetch(
                    `${URL}?${params.toString()}`,
                    {signal: controller.signal}
                )

                if(!response.ok) {
                    throw new Error('Ошибка ответа с сервера')
                }

                const data = await response.json()

                const goods = Array.isArray(data?.goods)
                    ? data.goods
                    : []

                const validGoods = goods.filter(item => 
                    item.brand?.trim()
                )

                setIsBrandNotFound(validGoods.length === 0) 

                if (brand) {
                    setParts(validGoods)
                } else {
                    const uniqueBrands = [
                        ...new Set(
                            validGoods.map(item => item.brand)
                        )
                    ]
                    setBrands(uniqueBrands)
                }

            } catch(err) {
                if (err.name === 'AbortError') return
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
                setIsBrandNotFound(false)
                setParts([])
                if (!brand) {
                    setBrands([])
                }
            }
            finally {
                setIsLoading(false)
            }
        }

        load()
        
        return () => controller.abort()
    }, [query, brand])
    

    return { parts, isLoading, error, brands, isBrandNotFound }
}