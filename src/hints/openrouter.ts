import { OpenRouter } from "@openrouter/sdk";
import { useEffect, useRef, useState } from "react";
import { useBoard } from "../data/GameDataProvider";
import { isAbortError } from "@openrouter/sdk/lib/http.js";

export const useOpenRouter = () => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openrouter/auto';
    
    return {
        orEnabled: !!apiKey,
        apiKey,
        model
    }
}

const useHintPrompt = () => {
    const { grid } = useBoard();

    return `Given 2048 game board state: ${JSON.stringify(grid)}.

    suggest best direction to move. Limit response to one of: up, down, left, right
    `;
};

export const useHint = () => {
    const { apiKey, model } = useOpenRouter();
    const [hint, setHint] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const prompt = useHintPrompt();
    let abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // cleanup on unmount
        return () => {
            abortControllerRef.current?.abort();
            setError(null);
            setHint('');
        }
    }, [prompt]);   // orompt changes when board changes

    const getHint = async () => {
        setLoading(true);
        setError(null);
        setHint('');

        const openRouter = new OpenRouter({ apiKey });

        try {
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            const completion = await openRouter.chat.send({
                chatGenerationParams: {
                    model,
                    messages: [
                        {
                        role: 'user',
                        content: prompt,
                        },
                    ],
                    stream: false,
                }
            }, { signal });
            setHint(completion.choices[0].message.content);
        } 
        catch (error) {
            if (isAbortError(error)) {
               console.log('Hint request cancelled');
            }
            else {
                console.error('Error fetching hint:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        } 
        finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    };

    const cancelHint = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    return { hint, loading, error, getHint, cancelHint };
};