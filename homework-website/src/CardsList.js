import { Link } from 'react-router-dom';
import { Card } from './Card';
import styles from './CardsList.module.css'
import React from 'react';

export const CardsList = React.memo(({ topics, query, questionsStatus }) => {
    const lowerQuery = query.toLowerCase()
    return (
        <div className={styles.list}>
            {topics.filter(topic =>
                topic.title.toLowerCase().includes(lowerQuery)
                || topic.subtitle.toLowerCase().includes(lowerQuery)
                || topic.status.toLowerCase().includes(lowerQuery)
            ).map(topic => {
                const topicStatus = questionsStatus.find(question => question.topic === topic.id)
                return (
                    <Link key={topic.id} className={styles.link} to={`/topics/${topic.id}`}>
                        <Card
                            key={topic.id}
                            title={topic.title}
                            subTitle={topic.subtitle}
                            variant={topic.variant}
                            status={topic.status}
                            statusCount={`${topicStatus.done}/${topicStatus.count}`}
                        />
                    </Link>
                )
            }

            )}

        </div>
    );
})