import { useState } from 'react';
import styles from './Modal.module.css'
import { TextInput } from './TextInput';
import { XIcon } from '@phosphor-icons/react';
import { Button } from './Button';

type Props = {

}

export const Modal = ({ }: Props) => {

    const [title, setTitle] = useState<string>('')
    const [teamName, setTeamName] = useState<string>('')

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1>Add New Meeting</h1>
                    <button>
                        <XIcon />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.titleAndTeamWrapper}>
                        <TextInput
                            label='Add Title'
                            placeholder='E.x Meeting for for'
                            value={title}
                            onChange={(text) => setTitle(text)}
                        />
                        <TextInput
                        label='Add Team Name'
                        placeholder='E.x UI Team'
                        value={teamName}
                        onChange={(text) => setTitle(text)}
                    />
                    
                    </div>
                    <TextInput
                            label='Add Title'
                            placeholder='E.x Meeting for for'
                            value={title}
                            onChange={(text) => setTitle(text)}
                        />
                </div>
                <div className={styles.footer}>
                    <Button
                        label='Add Meeting'
                        size='small'
                        onClick={() => console.log('clicked')}
                    />
                </div>
            </div>
        </div>

    );
}