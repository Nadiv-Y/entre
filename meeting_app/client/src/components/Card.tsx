import { ArrowsHorizontalIcon, XIcon } from '@phosphor-icons/react';
import styles from './Card.module.css'
import type { Meeting } from '../types'

interface CardProps {
    meeting: Meeting
    onDelete: (id: number) => void
}

export const Card = ({ meeting, onDelete }: CardProps) => {

    const getDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    // --- הפונקציה המתוקנת ---
    const getDuration = (startStr: string, endStr: string) => {
        const start = new Date(startStr);
        const end = new Date(endStr);

        // חישוב ההפרש במילי-שניות
        const diffMs = end.getTime() - start.getTime();
        // המרה לסך הכל דקות
        const totalMinutes = Math.floor(diffMs / 60000);

        // חישוב שעות ודקות
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        // הוספת אפס מוביל לדקות אם צריך (למשל 5 הופך ל-05)
        const minutesStr = minutes.toString().padStart(2, '0');

        // החזרת המחרוזת בפורמט H:MM
        return `${hours}:${minutesStr}`;
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span>{meeting.group_name}</span>
                <button
                    className={styles.iconButton}
                    onClick={() => onDelete(meeting.meeting_id)}
                >
                    <XIcon size={20} weight='regular' />
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <h2>{meeting.meeting_title}</h2>
                    <div className={styles.roomAndTimeWrapper}>
                        <p>{meeting.room_name}</p>
                        {/* הצגת הזמן בפורמט החדש */}
                        <span>{getDuration(meeting.start_time, meeting.end_time)}</span>
                    </div>

                </div>
                <p>{meeting.description}</p>

            </div>
            <div className={styles.footer}>
                <div className={styles.dateWrapper}>
                    <p className={styles.date}>{getDate(meeting.start_time)}</p>
                    <p>|</p>
                    <p className={styles.time}>{getTime(meeting.start_time)}</p>
                </div>
                <ArrowsHorizontalIcon />
                <div className={styles.dateWrapper}>
                    <p className={styles.date}>{getDate(meeting.end_time)}</p>
                    <p>|</p>
                    <p className={styles.time}>{getTime(meeting.end_time)}</p>
                </div>

            </div>
        </div>
    );
}