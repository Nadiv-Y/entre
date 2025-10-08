import { AccordionsList } from './AccordionsList';
import { Header } from './Header';
import styles from './TopicPage.module.css'
import { useParams } from 'react-router-dom';
import { useFetch } from './useFetch';


export const TopicPage = () => {
    const { topicId } = useParams()
    const { data: questions, loading: questionsLoading, error: questionsError } =
        useFetch({ url: `http://localhost:3000/questions?topicId=${topicId}` });

    const { data: currentTopic, loading: topicLoading, error: topicError } =
        useFetch({ url: `http://localhost:3000/topics/${topicId}` });

    if (questionsLoading || topicLoading) return <p>Loading...</p>;
    if (questionsError || topicError) return <p>Error loading data</p>;

    return (
        <div className={styles.page}>
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