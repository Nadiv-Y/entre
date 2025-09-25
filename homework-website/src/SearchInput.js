import styles from './SearcInput.module.css'

export const SearchInput = ({onChange}) => {
    return ( 
        <input
         className={styles.input}
          type="search" 
          onChange={onChange}
          />
     );
}