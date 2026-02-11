import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Modal.module.css';
import { TextInput } from './TextInput';
import { XIcon, WarningCircle } from '@phosphor-icons/react';
import { Button } from './Button';
import { DropDown } from './DropDown';

interface Group {
    group_id: number;
    group_name: string;
}

interface ModalProps {
    onAdd?: () => void;
    onClose: () => void;
    mode?: 'create' | 'warning';
    warningText?: string;
    onConfirm?: () => void;
}

// רשימת החדרים הקבועה (אפשר גם להביא מהשרת בעתיד)
const roomOptions = [
    'Zoom',
    'Room 201 (Small)',
    'Room 202 (Large)',
    'Board Room',
    'Open Space',
    'Kitchen'
];

export const Modal = ({
    onAdd,
    onClose,
    mode = 'create',
    warningText = 'Are you sure?',
    onConfirm
}: ModalProps) => {

    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [selectedGroupName, setSelectedGroupName] = useState<string>('');
    const [isNewGroupMode, setIsNewGroupMode] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const [title, setTitle] = useState<string>('');
    const [room, setRoom] = useState<string>(''); // State לחדר
    const [description, setDescription] = useState<string>('');
    const [startDateAndTime, setStartDateAndTime] = useState<string>('');
    const [endDateAndTime, setEndDateAndTime] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>('');

    const isTimeInvalid = startDateAndTime !== '' && endDateAndTime !== '' &&
        new Date(endDateAndTime) <= new Date(startDateAndTime);

    useEffect(() => {
        if (mode === 'create') {
            axios.get('http://localhost:3000/api/groups')
                .then(response => {
                    setGroups(response.data);
                    if (response.data.length > 0) {
                        const firstGroup = response.data[0];
                        setSelectedGroupId(firstGroup.group_id.toString());
                        setSelectedGroupName(firstGroup.group_name);
                    }
                })
                .catch(error => console.error("Error fetching groups:", error));
        }
    }, [mode]);

    const dropdownOptions = [...groups.map(g => g.group_name), "+ Create new team..."];

    const handleDropDownSelect = (option: string) => {
        if (option === "+ Create new team...") {
            setIsNewGroupMode(true);
            setSelectedGroupId('');
        } else {
            const foundGroup = groups.find(g => g.group_name === option);
            if (foundGroup) {
                setSelectedGroupId(foundGroup.group_id.toString());
                setSelectedGroupName(foundGroup.group_name);
                setIsNewGroupMode(false);
            }
        }
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        setServerError('');

        const isGroupValid = isNewGroupMode ? newGroupName !== '' : selectedGroupId !== '';

        if (title === '' || room === '' || !isGroupValid || startDateAndTime === '' || endDateAndTime === '' || isTimeInvalid) {
            return;
        }

        try {
            const payload: any = {
                meeting_title: title,
                description: description,
                start_time: startDateAndTime,
                end_time: endDateAndTime,
                room_name: room
            };

            if (isNewGroupMode) {
                payload.new_group_name = newGroupName;
            } else {
                payload.group_id = Number(selectedGroupId);
            }

            await axios.post('http://localhost:3000/api/meetings', payload);

            if (onAdd) onAdd();
            onClose();

        } catch (error: any) {
            console.error("Error creating meeting:", error);
            if (error.response && error.response.status === 409) {
                setServerError("Meeting overlaps with an existing one in this team.");
            } else {
                setServerError("Failed to create meeting. Please try again.");
            }
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.header}>
                    <h1 className={styles.title}>{mode === 'create' ? 'Add New Meeting' : 'Delete Meeting'}</h1>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <XIcon size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {mode === 'create' ? (
                        <>
                            <TextInput
                                id='title'
                                label='Title'
                                placeholder='Weekly Sync'
                                value={title}
                                onChange={setTitle}
                                required
                                error={isSubmitted && title === '' ? 'Required' : undefined}
                            />
                            <div className={styles.Wrapper}>


                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <label className={styles.dropdownLabel}>
                                        Team Name
                                    </label>

                                    {!isNewGroupMode ? (
                                        <div className={styles.drowdownMargin}>
                                            <DropDown
                                                options={dropdownOptions}
                                                placeholder="Select a team"
                                                onSelect={handleDropDownSelect}
                                                value={selectedGroupName}
                                                fullWidth
                                            />
                                        </div>

                                    ) : (
                                        <div className={styles.dropdownWrapper}>
                                            <div style={{ flex: 1 }}>
                                                <TextInput
                                                    id="new-group"
                                                    value={newGroupName}
                                                    onChange={setNewGroupName}
                                                    placeholder="Enter new team name..."
                                                    error={isSubmitted && newGroupName === '' ? 'Required' : undefined}
                                                    label={''} />
                                            </div>
                                            <button className={styles.dropdownBtn}
                                                onClick={() => {
                                                    setIsNewGroupMode(false);
                                                }}
                                                title="Back to list"
                                            >
                                                ↩
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                                    <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                                        Room / Location <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <DropDown
                                        options={roomOptions}
                                        placeholder="Select a room"
                                        onSelect={(selectedRoom) => setRoom(selectedRoom)}
                                        value={room}
                                        fullWidth
                                    />
                                    {isSubmitted && room === '' && (
                                        <span style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>Required</span>
                                    )}
                                </div>
                            </div>


                            <TextInput
                                id='description'
                                label='Meeting Description'
                                placeholder='What is this meeting about?'
                                value={description}
                                onChange={setDescription}
                            />

                            <div className={styles.Wrapper}>
                                <TextInput
                                    id='start'
                                    label='Start Date and Time'
                                    type='datetime-local'
                                    value={startDateAndTime}
                                    onChange={setStartDateAndTime}
                                    required
                                    error={isSubmitted && startDateAndTime === '' ? 'Required' : undefined}
                                />
                                <TextInput
                                    id='end'
                                    label='End Date and Time'
                                    type='datetime-local'
                                    value={endDateAndTime}
                                    onChange={setEndDateAndTime}
                                    required
                                    error={
                                        isSubmitted && endDateAndTime === ''
                                            ? 'Required'
                                            : isTimeInvalid
                                                ? 'End time must be after start time'
                                                : undefined
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <div>
                            <p style={{ fontSize: '1.1rem', color: '#333' }}>{warningText}</p>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                                This action cannot be undone.
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.footer} style={{ flexDirection: 'column', gap: '10px' }}>
                    {serverError && (
                        <div style={{ color: '#d32f2f', fontSize: '0.9rem', textAlign: 'center', marginBottom: '5px', fontWeight: 500 }}>
                            {serverError}
                        </div>
                    )}

                    {mode === 'create' ? (
                        <Button
                            label='Add Meeting'
                            size='small'
                            onClick={handleSubmit}
                        />
                    ) : (
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
                            <div onClick={onConfirm}>
                                <Button label='Yes, Delete' size='small' />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};