import styles from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps {
 label: string
 size?: 'small' | 'medium'
 onClick: () => void
}

export const Button = ({label, onClick, size = 'medium'}: ButtonProps) => {
    return ( 
        <button
        className={clsx(
            styles.button,
            styles[size]
        )}
        onClick={onClick}
        >
            {label}
        </button>
    );
}