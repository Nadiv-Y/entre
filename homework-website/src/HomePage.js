import { useEffect, useState } from 'react';
import { CardsList } from './CardsList';
import { Header } from './Header';
import styles from './HomePage.module.css'
import { useFetch } from './useFetch';

export const HomePage = () => {
    const [query, setQuery] = useState('')
    const [topicsQuestionsStatus, setTopicsQuestionsStatus] = useState([]);
    const { data: topics, loading, error } = useFetch({ url: 'http://localhost:3000/topics' })
    const { data: questions, loading: questionsLoading, error: questionsError } = useFetch({ url: `http://localhost:3000/questions` })


    useEffect(() => {
        const topicsIds = topics.map(topic => topic.id)
        const status = []

        topicsIds.forEach(topic => {
            let qustionsCount = 0
            let doneQuestions = 0

                questions.forEach(question => {
                    if (question.topicId === topic) {
                        qustionsCount++
                    }
                    if (question.topicId === topic && question.status === "Done") {
                        doneQuestions++
                    }
                })

                status.push({
                    topic, 
                    count: qustionsCount,
                    done: doneQuestions
                })
            
        })

        setTopicsQuestionsStatus(status)
    }, [topics, questions])

    
    if (loading || questionsLoading) return <p>Loading...</p>;
    if (error || questionsError) return <p>Error: {error}</p>;

    console.log(topicsQuestionsStatus)

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
                questionsStatus={topicsQuestionsStatus}
            />
        </div>
    );
}