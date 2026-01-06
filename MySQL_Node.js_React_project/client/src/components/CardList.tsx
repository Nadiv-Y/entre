import styles from './CardList.module.css'
import type { MeetingData } from '../types'
import { Card } from './Card';
import { Modal } from './Modal';

interface CardListProps {
    meetings: MeetingData[]
    onDelete: (id: string | number) => void
}

export const CardList = ({ meetings, onDelete }: CardListProps) => {
    return (
        <div className={styles.list}>
            <Modal/>
            {meetings.length === 0 ? <p>No mettings...</p> : meetings.map(meeting => (
                <Card
                    key={meeting.id}
                    id={meeting.id}
                    headerTitle={meeting.headerTitle}
                    contentTitle={meeting.contentTitle}
                    content={meeting.content}
                    startDate={meeting.startDate}
                    startTime={meeting.startTime}
                    endDate={meeting.endDate}
                    endTime={meeting.endTime}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}