import axios from 'axios';
import { huggingFaceConfig } from '../config/huggingface.config';

const MODEL_CONFIG = {
    baseURL: 'https://api-inference.huggingface.co/models/gpt2',
    maxRetries: 5,
    initialRetryDelay: 3000,
    parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false,
        repetition_penalty: 1.2,
    },
};

interface HuggingFaceResponse {
    generated_text: string;
}

type HuggingFaceAPIResponse = HuggingFaceResponse[];

const api = axios.create({
    baseURL: MODEL_CONFIG.baseURL,
    headers: {
        'Authorization': `Bearer ${huggingFaceConfig.token}`,
        'Content-Type': 'application/json',
    },
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.error || error.message;

        const errorMessages = {
            401: '❌ Unauthorized: Check your Hugging Face API token.',
            403: '🚫 Forbidden: Your token might not have access to this model.',
            404: '🔍 Model not found: Check the model name.',
        };

        if (status && status in errorMessages) {
            throw new Error(errorMessages[status as keyof typeof errorMessages]);
        }

        throw new Error(`Hugging Face API Error: ${message}`);
    }
    throw error;
};

const isModelLoading = (error: any): boolean => {
    return !!error?.response?.data?.error?.includes('loading');
};

interface PromptInput {
    userInput: string;
    language: 'en' | 'id';
    context?: string;
}

const getPromptTemplate = (input: PromptInput): string => {
    const contextPrefix = input.context ? `${input.context}\n` : '';

    const systemPrompt = input.language === 'id' ?
        'Anda adalah asisten AI yang membantu dan memberikan jawaban yang bermakna.' :
        'You are a helpful AI assistant that provides thoughtful responses.';

    return `${systemPrompt}\n\n${contextPrefix}Human: ${input.userInput} Assistant:`;
};

const makeModelRequest = async (input: PromptInput): Promise<HuggingFaceResponse> => {
    const formattedPrompt = getPromptTemplate(input);
    const response = await api.post<HuggingFaceAPIResponse>('', {
        inputs: formattedPrompt,
        parameters: MODEL_CONFIG.parameters,
    });
    return response.data[0];
};

export const generateText = async (
    input: PromptInput,
    maxRetries = MODEL_CONFIG.maxRetries
): Promise<HuggingFaceResponse> => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await makeModelRequest(input);
        } catch (error) {
            if (isModelLoading(error)) {
                const retryDelay = MODEL_CONFIG.initialRetryDelay * Math.pow(2, attempt);
                console.log(`Model loading, attempt ${attempt + 1} of ${maxRetries}... (waiting ${retryDelay / 1000}s)`);
                await wait(retryDelay);
                continue;
            }
            handleApiError(error);
        }
    }
    throw new Error('Model failed to load after maximum retries');
};
