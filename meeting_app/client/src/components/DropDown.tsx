import { useEffect, useState } from 'react';
import styles from './DropDown.module.css'
import { CaretDownIcon } from '@phosphor-icons/react';

interface DropDownProps {
 options: string[]
 placeholder: string
 onSelect: (option: string) => void
 value?: string
 fullWidth?: boolean
}

export const DropDown = ({options, placeholder, onSelect, value, fullWidth = false}: DropDownProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>(value || placeholder)

    useEffect(() => {
        if (value) {
            setSelectedOption(value);
        }
    }, [value])
    
    return ( 
        <div 
        className={styles.dropdown}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: fullWidth ? '100%' : undefined }}
        >
            <div className={styles.header}>
                <p>{selectedOption}</p>
                <CaretDownIcon/>
            </div>
            {isOpen && <ul className={styles.optionsList}>
                {options.map( option => (
                    <li
                    key={option}
                    className={styles.option}
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOption(option)
                        onSelect(option)
                        setIsOpen(false)
                    }}
                    >
                        {option}
                    </li>
                ))}
            </ul>}   
        </div>
    );
}