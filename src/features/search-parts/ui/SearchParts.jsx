import { useState, useEffect } from 'react'
import styles from './searchParts.module.css'
import searchIcon from '@/shared/assets/icons/searchIcon.png.webp'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useFetchQuery } from '../lib/hooks/useFetchQuery'
import { BrandDropdown } from './BrandDropdown'
import { useDispatch } from 'react-redux'
import { setSearchParts, setIsLoading, setError } from '../model/reducer'

export const SearchParts = () => {
    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const debouncedQuery = useDebounce(query, 500)

    const normalizedQuery = query.trim()
    const normalizedDebouncedQuery = debouncedQuery.trim()

    const requestQuery = 
        normalizedQuery === normalizedDebouncedQuery
        ? normalizedDebouncedQuery
        : ''

    const { parts,
            isLoading: isLoadingParts, 
            error, 
            brands,
            isBrandNotFound
          } = useFetchQuery(requestQuery, selectedBrand)
     
    useEffect(() => {
        dispatch(setSearchParts(parts ?? []))
        dispatch(setIsLoading(isLoadingParts))
        dispatch(setError(error))
    },[parts, isLoadingParts, error])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleQuerySearch = (e) => {
        setQuery(e.target.value)
        setSelectedBrand('')
    }

    const handleSelected = (brand) => {
        setSelectedBrand(brand)
    }

    const handleOpen = (value) => {
        setIsOpen(value)
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} role='search'>
                <div className={`${styles.field} ${query ? styles.filled : ''}`}>
                    <input 
                        id='searchInput'
                        type="text"
                        value={query}
                        onChange={handleQuerySearch}
                        className={styles.input}
                        autoComplete='off'
                    />
                    <label htmlFor="searchInput" className={styles.searchLabel}>Артикул</label>

                    <BrandDropdown 
                        brands={brands}
                        onSelect={handleSelected}
                        onOpen={handleOpen}
                        isOpen={isOpen}/>
                </div>
                <button 
                    type='submit' 
                    className={styles.button}
                    onClick={() => handleOpen(true)}    
                >
                    <svg 
                        className={styles.iconSearch}
                        width='24'
                        height='24'>
                            <image 
                                href={searchIcon} 
                                width='100%'
                                height='100%'

                            />
                    </svg>
                </button>
            </form>
            {isBrandNotFound && !isLoadingParts && (
                <div className={styles.notification}>
                    Бренд не найден
                </div>
            )}
        </div>
    )
}