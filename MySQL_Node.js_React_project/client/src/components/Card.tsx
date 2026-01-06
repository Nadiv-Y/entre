import { ArrowsHorizontalIcon, XIcon } from '@phosphor-icons/react';
import styles from './Card.module.css'
import type { MeetingData } from '../types';

interface CardProps extends MeetingData {
    onDelete: (id: string | number) => void
}

export const Card = ({ headerTitle, contentTitle, content, startDate, startTime, endDate, endTime, id, onDelete }: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <p>{headerTitle}</p>
                <button
                 className={styles.iconButton}
                 onClick={() => onDelete(id)}
                 >
                    <XIcon />
                </button>
            </div>
            <div className={styles.content}>
                <h2>{contentTitle}</h2>
                <p>{content}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.dateWrapper}>
                    <p className={styles.date}>{startDate}</p>
                    <p>|</p>
                    <p className={styles.time}>{startTime}</p>
                </div>
                <ArrowsHorizontalIcon />
                <div className={styles.dateWrapper}>
                    <p className={styles.date}>{endDate} </p>
                    <p>|</p>
                    <p className={styles.time}>{endTime}</p>
                </div>
            </div>
        </div>
    );
}