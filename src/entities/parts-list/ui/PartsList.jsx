import { useSelector } from 'react-redux'
import { TableLoader } from './TableLoader'
import { TableError } from './TableError'
import { useEffect, useState } from 'react'
import styles from './partsList.module.css'

export const PartsList = () => {
    const parts = useSelector(state => state.search.parts)
    const isLoading = useSelector(state => state.search.isLoading)
    const error = useSelector(state => state.search.error) 
    const [showLoader, setShowLoader] = useState(false)
    
    useEffect(() => {
        let timer 

        if(isLoading) {
            timer = setTimeout(() => {
                setShowLoader(true)
            }, 500)
        } else {
            setShowLoader(false)
        }

        return () => clearTimeout(timer)
    }, [isLoading])

    const analogues = Array.isArray(parts[0]?.analogues)
        ? parts[0].analogues
        : []

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.head}>
                        <tr>
                            <th>Название / Производитель</th>
                            <th>Стоимость</th>
                            <th>Доступный остаток на складе</th>
                        </tr>
                    </thead>

                    <tbody className={styles.body}>
                        {isLoading && showLoader && <TableLoader />}

                        {!isLoading && error && <TableError error={error} />}
                        
                        {parts.map((part) => (
                            <tr key={part.goodsID}>
                                <td>{`${part.name} / ${part.brand}`}</td>
                                <td>{part.price}</td>
                                <td>{part.count}</td>
                            </tr>
                        ))}
                        {analogues.length > 0 && (
                            <tr>
                                <td colSpan={3} className={styles.analog}>
                                    Аналоги
                                </td>
                            </tr>
                        )}
                        {analogues.map((part) => (
                            <tr key={part.goodsID}>
                                <td>{`${part.name} / ${part.brand}`}</td>
                                <td>{part.price}</td>
                                <td>{part.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}