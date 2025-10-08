import styles from './Accordion.module.css'
import { CaretRight } from "phosphor-react";
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react';
import { memo } from "react";

export const Accordion = memo(({ title, children, status }) => {
    const [collapse, setCollapse] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const contentRef = useRef(null);

    useEffect(() => {
        collapse && contentRef.current
          ? setMaxHeight(`${contentRef.current.scrollHeight}px`)
          : setMaxHeight("0px");
    }, [collapse, children]);

    console.log("Render:", title);

    return (
        <div className={styles.accordion}>
            <div
                className={styles.accordionHeader}
                onClick={() => setCollapse(prev => !prev)}
            >
                <p className={styles.accordionTitle}>{title}</p>
                <div className={styles.sideActions}>
                    <p className={styles.status}>{status}</p>
                    <CaretRight
                        className={cn(styles.icon, collapse && styles.openIcon)}
                        size={20}
                    />
                </div>
            </div>
            <div
                style={{ maxHeight }}
                ref={contentRef}
                className={cn(styles.content, collapse && styles.open)}
            >
                <div className={styles.paddingWrapper}>{children}</div>
            </div>
        </div>
    );
});


const students = [
  { name: 'Tom', grade: 90 },
  { name: 'Ana', grade: 80 },
  { name: 'Ben', grade: 90 },
  { name: 'Liz', grade: 70 }
];

const studentsIndex = students.map((student, i) => ({...student, index: i}) )

const sorted = studentsIndex.sort((a,b) =>{
    if (a.grade !== b.grade) return a.grade - b.grade
    return a.index -b.index

})

console.log(sorted);
