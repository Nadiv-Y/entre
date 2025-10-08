import styles from './AccordionsList.module.css'
import { Accordion } from './Accordion';
import { CodeBlock } from './CodeBlock';
import React from 'react';

export const AccordionsList = React.memo(({ questions }) => {
    return (
        <div className={styles.list}>
            {questions.map(question =>
                <Accordion
                    key={question.id}
                    title={question.question}
                    status={question.status}
                >
                    {question.hasCode
                        ? <CodeBlock>{question.answer}</CodeBlock>
                        : <p>{question.answer}</p>
                    }
                </Accordion>
            )}
        </div>
    );
});
