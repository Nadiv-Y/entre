import { Link } from 'react-router-dom';
import { Card } from './Card';
import styles from './CardsList.module.css'

export const CardsList = ({ topics, query }) => {
    const lowerQuery = query.toLowerCase()

    return (
        <div className={styles.list}>
            {topics.filter(topic =>
                topic.title.toLowerCase().includes(lowerQuery)
                || topic.subtitle.toLowerCase().includes(lowerQuery)
                || topic.status.toLowerCase().includes(lowerQuery)
            ).map(topic =>
                <Link className={styles.link} to={`/topics/${topic.id}`}>
                    <Card
                        key={topic.id}
                        title={topic.title}
                        subTitle={topic.subtitle}
                        variant={topic.variant}
                        status={topic.status}
                    />
                </Link>

            )}

        </div>
    );
}