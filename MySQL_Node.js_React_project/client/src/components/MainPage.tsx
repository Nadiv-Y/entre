import { useState } from 'react';
import { Button } from './Button';
import { DropDown } from './DropDown';
import styles from './MainPage.module.css'
import type { MeetingData } from '../types';
import { CardList } from './CardList';
import { TextInput } from './TextInput';

interface MainPageProps {

}

const fakeMeetings = [
    {
        id: 101,
        headerTitle: "צוות מוצר (Product)",
        contentTitle: "תכנון ספרינט רבעוני - Q1",
        content: "מעבר על היעדים המרכזיים לרבעון הקרוב, תעדוף משימות עבור הפיצ'ר החדש וחלוקת עבודה בין הצוותים.",
        startDate: "2025-01-15",
        startTime: "10:00",
        endDate: "2025-01-15",
        endTime: "12:00"
    },
    {
        id: "mtg_254",
        headerTitle: "עיצוב ו-UI",
        contentTitle: "Design Review: מערכת הניהול",
        content: "ביקורת עיצוב על המסכים החדשים של דשבורד המנהלים. יש להתמקד בזרימת המשתמש (User Flow) ובנגישות הצבעים.",
        startDate: "2025-01-16",
        startTime: "14:30",
        endDate: "2025-01-16",
        endTime: "15:30"
    },
    {
        id: 305,
        headerTitle: "משאבי אנוש",
        contentTitle: "ראיון עבודה - מפתח Full Stack",
        content: "ראיון טכני עם המועמד דניאל לוי. נדרש להכין שאלות בנושאי React ו-Node.js ולבדוק את מטלת הבית.",
        startDate: "2025-01-18",
        startTime: "09:00",
        endDate: "2025-01-18",
        endTime: "10:15"
    },
    {
        id: 306,
        headerTitle: "משאבי אנוש",
        contentTitle: "ראיון עבודה - מפתח Full Stack",
        content: "ראיון טכני עם המועמד דניאל לוי. נדרש להכין שאלות בנושאי React ו-Node.js ולבדוק את מטלת הבית.",
        startDate: "2025-01-18",
        startTime: "09:00",
        endDate: "2025-01-18",
        endTime: "10:15"
    }
]

export const MainPage = ({ }: MainPageProps) => {

    const [selectedTeam, setSelectedTeam] = useState<string>('')
    const [meetings, setMeetings] = useState<MeetingData[]>(fakeMeetings)

    const teamNames = ['All Teams', ...new Set(meetings.map(meeting => (
        meeting.headerTitle
    )))]

    const meetingsArry = selectedTeam.length === 0 || selectedTeam === 'All Teams' ? meetings :  meetings.filter(meeting => (
        meeting.headerTitle === selectedTeam
    ))

    const handleDelete = (id: string | number) => {
        const filteredMeetings = meetings.filter( meeting => meeting.id !== id)
        setMeetings(filteredMeetings)
    }


    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <DropDown
                    options={teamNames}
                    placeholder='Choose Option'
                    onSelect={(option) => setSelectedTeam(option)}
                />
                <h1 className={styles.title}>The Dev Meeting Time</h1>
                <Button
                    label='New Meeting'
                    onClick={() => console.log('clicked')}
                />
            </div>
            <div className={styles.divider}>
                <div className={styles.topLine}></div>
                <div className={styles.bottomLine}></div>
            </div>
            <CardList
                meetings={meetingsArry}
                onDelete={handleDelete}
            />
        </div>
    );
}