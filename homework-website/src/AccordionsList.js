import styles from './AccordionsList.module.css'
import { Accordion } from './Accordion';
import { CodeBlock } from './CodeBlock';

export const AccordionsList = ({questions}) => {

    
    return ( 
        <div className={styles.list}>
            {questions.map(question => 
                <Accordion
                key={question.id}
                title={question.question}
                status={question.status}
                > 
                {question.hasCode
                ? <CodeBlock children={question.answer}  />
                : <p>{question.answer}</p>
            }    
                </Accordion>
            )}
        </div>
     );
}