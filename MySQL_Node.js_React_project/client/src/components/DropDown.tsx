import { useState } from 'react';
import styles from './DropDown.module.css'

interface DropDownProps {
 options: string[]
 placeholder: string
 onSelect: (option: string) => void
}

export const DropDown = ({options, placeholder, onSelect}: DropDownProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>(placeholder)

    return ( 
        <div 
        className={styles.dropdown}
        onClick={() => setIsOpen(!isOpen)}
        >
            <div className={styles.header}>
                <p>{selectedOption}</p>
                
            </div>
            {isOpen && <ul className={styles.optionsList}>
                {options.map( option => (
                    <li
                    key={option}
                    className={styles.option}
                    onClick={() => {
                        setSelectedOption(option)
                        onSelect(option)
                    }}
                    >
                        {option}
                    </li>
                ))}
            </ul>}   
        </div>
    );
}