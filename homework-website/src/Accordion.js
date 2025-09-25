import styles from './Accordion.module.css'
import { CaretRight } from "phosphor-react";
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react';

export const Accordion = ({ title, children, status }) => {
    const [collapse, setCollapse] = useState(false)
    const [maxHeight, setMaxHeight] = useState("0px");

    const contentRef = useRef(null)

    useEffect(() => {
        collapse && contentRef.current ? setMaxHeight(`${contentRef.current?.scrollHeight}px`) : setMaxHeight('0px')

    }, [collapse, children])


    return (
        <div
            className={styles.accordion}
        >
            <div className={styles.accordionHeader}
                onClick={() => setCollapse(!collapse)}
            >
                <p className={styles.accordionTitle}>{title}</p>
                <div className={styles.sideActions}>
                    <p className={styles.status}>{status}</p>
                    <CaretRight
                        className={cn(styles.icon, collapse && styles.openIcon)}
                        size={20} />
                </div>
            </div>
            <div
                style={{ maxHeight }}
                ref={contentRef} className={cn(styles.content, collapse && styles.open)}>
                    <div className={styles.paddingWrapper}>
                        {children}
                    </div>    
            </div>
        </div>
    );
}