import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

export const MemoizedReactMarkdown = memo(({ content }: { content: string }) => {
    return (
        <ReactMarkdown
            children={content}
            components={{
                ul: ({ children }) => (
                    <ul className="ml-4 -my-6">{children}</ul>  
                ),
                li: ({ children }) => (
                    <li className="ml-4 -my-1 list-disc">{children}</li>  
                ),
                p: ({ children }) => (
                    <p className="-my-1">{children}</p>  
                ),
                strong: ({ children }) => (
                    <strong className="-my-1">{children}</strong>
                ),
            }}
        />
    );
});


export const MemoizedReactMarkdown2 = memo(({ content }: { content: string }) => {
    return (
        <ReactMarkdown
            children={content}
            components={{
                ul: ({ children }) => (
                    <ul className="ml-4">{children}</ul>  
                ),
                li: ({ children }) => (
                    <li className="ml-4 list-disc">{children}</li>  
                ),
                p: ({ children }) => (
                    <p>{children}</p>  
                ),
                strong: ({ children }) => (
                    <strong>{children}</strong>
                ),
            }}
        />
    );
});