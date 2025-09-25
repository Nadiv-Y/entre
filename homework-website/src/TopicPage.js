import { useEffect, useState } from 'react';
import { AccordionsList } from './AccordionsList';
import { Header } from './Header';
import styles from './TopicPage.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ColorSwitch, Comp, Counter } from './textDeleteAfter';

export const TopicPage = () => {
    const {topicId} = useParams()
    const [questions, setQuestions] = useState([])
    const [currentTopic, setCurrentTopic] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/questions?topicId=${topicId}`)
                const topicRes = await axios.get(`http://localhost:3000/topics/${topicId}`)

                setQuestions(res.data)
                setCurrentTopic(topicRes.data)

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()

    }, [topicId])
    return (
        <div className={styles.page}>
        <Comp/>
            <Header
                title={currentTopic.title}
                subtitle={currentTopic.subtitle}
                showSearch={false}
            />

            <AccordionsList 
                questions={questions}
            />
        </div>
    );
}