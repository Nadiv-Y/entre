import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const CodeBlock = ({ children, language = "jsx" }) => {
    return (
        <SyntaxHighlighter language={language} style={oneDark}>
            {children}
        </SyntaxHighlighter>
    );
}