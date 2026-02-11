import styles from './CardList.module.css'
import type { Meeting } from '../types'
import { Card } from './Card';

interface CardListProps {
    meetings: Meeting[]
    onDelete: (id:number) => void
}

export const CardList = ({ meetings, onDelete }: CardListProps) => {
    return (
        <div className={styles.list}>
            {meetings.length === 0 ? <p>No mettings...</p> : meetings.map(meeting => (
                <Card
                    key={meeting.meeting_id}
                    meeting={meeting}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}