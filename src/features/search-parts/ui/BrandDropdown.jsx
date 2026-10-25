import { useState, useEffect, useRef } from 'react'
import styles from './brandDropdown.module.css'

export const BrandDropdown = ({brands, onSelect, onOpen, isOpen}) => {
    const dropdownRef = useRef(null)

    useEffect(() => {
        onOpen(brands.length > 0)
    }, [brands])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onOpen(false)
            }
        }

        const handlePointerDown = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                onOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('pointerdown', handlePointerDown)

        return () => {
            removeEventListener('keydown', handleKeyDown)
            removeEventListener('click', handlePointerDown)
        } 
    })

    const handleBrandClick = (brand) => {
        onSelect(brand)
        onOpen(false)
    }

    if(!brands.length) {
        return null
    }

    return (
       <div 
        ref={dropdownRef}
        className={styles.dropdownMenu}
       >
        {isOpen  && (
            <ul className={styles.brandsList}>
                {brands.map((brand, index) => (
                    <li 
                        key={index}
                        className={styles.brand}
                    >
                        <button 
                            className={styles.brandButton}
                            onClick={() => handleBrandClick(brand)}
                        >
                            {brand}
                        </button>
                    </li>
                )) 

                }
            </ul>
        )}
       </div>
    )
}