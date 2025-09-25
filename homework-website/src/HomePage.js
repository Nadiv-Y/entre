import { useEffect, useState } from 'react';
import { CardsList } from './CardsList';
import { Header } from './Header';
import styles from './HomePage.module.css'
import axios from 'axios'

export const HomePage = () => {
    const [topics, setTopics] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchData = async () => {

            try {
            const res = await axios.get('http://localhost:3000/topics')
            setTopics(res.data)
            
        } catch (error) {
            console.log(error.message)

        }
        }

        fetchData()  
    }, [])

    return ( 
        <div className={styles.page}>
            <Header
            setQuery={setQuery}
            title="Full Stack - Homework"
            subtitle='Dolev Brosh'
            />
            <CardsList 
            topics={topics}
            query={query}
            />
        </div>
     );
}