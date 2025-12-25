import { useState } from 'react';
import { Button } from './Button';
import { DropDown } from './DropDown';
import styles from './MainPage.module.css'

interface MainPageProps {
 
}
export const MainPage = ({}: MainPageProps) => {

    const [selectedTeam, setSelectedTeam] = useState<string>('')

    return ( 
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>The Dev Meeting Time</h1>
                <Button
                label='New Meeting'
                onClick={() => console.log('clicked')}
                />
                <DropDown
                options={['option1','option2', 'option3' ]}
                placeholder='Choose Option'
                onSelect={(option) => setSelectedTeam(option)}
                />
            </div>
        </div>
    );
}