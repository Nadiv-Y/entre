import styles from './TextInput.module.css'
import clsx from 'clsx'

interface TextInputProps {
    label: string
    placeholder?: string
    error?: string
    value: string
    disabled?: boolean
    required?: boolean
    onChange: (text: string) => void
}

export const TextInput = ({ label, placeholder, value, error, disabled, required, onChange }: TextInputProps) => {

    return (
        <div className={styles.inputWrapper}>
            <label 
            className={styles.label}
            htmlFor='text-input'
            >
                {label} {required && <span className={styles.asterisk}>*</span>}
            </label>
            <input
                id='text-input'
                className={clsx(
                    styles.input,
                    error && styles.error,
                    disabled && styles.disabled,
                    required && styles.required
                )}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}