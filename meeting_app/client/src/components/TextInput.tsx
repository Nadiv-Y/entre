import styles from './TextInput.module.css'
import clsx from 'clsx'

interface TextInputProps {
    id: string
    label: string
    placeholder?: string
    error?: string
    value: string
    disabled?: boolean
    required?: boolean
    type?: 'text' | 'date' | 'time' | 'datetime-local'
    onChange: (text: string) => void
}

export const TextInput = ({ id, label, placeholder, value, error, disabled, required, onChange, type='text' }: TextInputProps) => {

    return (
        <div className={styles.inputWrapper}>
            <label 
            className={styles.label}
            htmlFor={id}
            >
                {label} {required && <span className={styles.asterisk}>*</span>}
            </label>
            <input
                id={id}
                className={clsx(
                    styles.input,
                    error && styles.error,
                    disabled && styles.disabled,
                    required && styles.required,
                )}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}