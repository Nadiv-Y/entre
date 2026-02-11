import { useEffect, useState } from 'react';
import { Button } from './Button';
import axios from 'axios';
import { DropDown } from './DropDown';
import styles from './MainPage.module.css'
import type { Meeting } from '../types';
import { CardList } from './CardList';
import { Modal } from './Modal';
import logo from '../assets/logo.png';

interface MainPageProps { }

interface Group {
    group_id: number;
    group_name: string;
}

export const MainPage = ({ }: MainPageProps) => {

    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [groups, setGroups] = useState<Group[]>([])
    const [meetingToDelete, setMeetingToDelete] = useState<number | null>(null)
    const [selectedTeam, setSelectedTeam] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = async () => {
        try {
            const [meetingsRes, groupsRes] = await Promise.all([
                axios.get('http://localhost:3000/api/meetings'),
                axios.get('http://localhost:3000/api/groups')
            ]);

            setMeetings(meetingsRes.data);
            setGroups(groupsRes.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const teamNames = ['All Teams', ...groups.map(g => g.group_name)];
    
    const meetingsArry = selectedTeam.length === 0 || selectedTeam === 'All Teams' ? meetings : meetings.filter(meeting => (
        meeting.group_name === selectedTeam
    ))

    const handleDelete = async (id: number) => {
        setMeetingToDelete(id)
    };

    const confirmDelete = async () => {
        if (meetingToDelete !== null) {
            try {
                await axios.delete(`http://localhost:3000/api/meetings/${meetingToDelete}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
            setMeetingToDelete(null);
        }
    }

    const handleMeetingAdded = () => {
        fetchData();
        setIsModalOpen(false);
    }


    return (
        <div className={styles.page}>
            {isModalOpen && <Modal
                mode='create'
                onAdd={handleMeetingAdded}
                onClose={() => setIsModalOpen(false)}
            />}
            {meetingToDelete !== null && (
                <Modal
                    mode="warning"
                    warningText="Are you sure you want to delete this meeting?"
                    onClose={() => setMeetingToDelete(null)}
                    onConfirm={confirmDelete}
                />
            )}
            <div className={styles.header}>
                <img
                    className={styles.logo}
                    src={logo} alt="logo" />
                <div className={styles.actionsWrapper}>
                    <DropDown
                        options={teamNames}
                        placeholder='Choose Option'
                        onSelect={(option) => setSelectedTeam(option)}
                    />
                    <Button
                        label='New Meeting'
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
            <CardList
                meetings={meetingsArry}
                onDelete={handleDelete}
            />
        </div>
    );
}