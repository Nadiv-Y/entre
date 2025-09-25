import styles from './Card.module.css'
import reactLogo from './lib/react.svg'
import javaScriptLogo from './lib/javaScript.svg'
import cn from 'classnames'

export const Card = ({title, subTitle, status, variant='react', onClick}) => {
    return ( 
        <div 
        className={cn(styles.card,
         variant === 'javaScript' && styles.javaScript)}
         onClick={onClick}>
            <div className={styles.cardContent}>
                <img className={styles.logo} src={
                    variant === 'react' ? reactLogo : javaScriptLogo 
                } alt='logo'/>
                <div className={styles.textWrapper}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.subTitle}>{subTitle}</p>
                </div>  
            </div>
            <p className={cn(styles.status, variant === 'javaScript' && styles.statusJavaScript)}>{status}</p>
        </div>
     );
}