import styles from './Header.module.css'
import { SearchInput } from './SearchInput';
import cn from 'classnames'

export const Header = ({ setQuery, title, subtitle, showSearch = true }) => {
    return (
        <div className={styles.header}>
            <div className={styles.textWrapper}>
                <h1 className={styles.mainTitle}>{title}</h1>
                <h2 className={styles.subTitle}>{subtitle}</h2>
            </div>

            {showSearch && (
                <SearchInput
                    onChange={(e) => setQuery(e.target.value)}
                />
            )
            }

        </div>
    );
}