import { create } from 'zustand';

interface LoadingState {
    isVisible: boolean;
    message: string;
    showLoading: (message?: string) => void;
    hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isVisible: false,
    message: 'Loading...',
    showLoading: (message = 'Loading...') => set({ isVisible: true, message }),
    hideLoading: () => set({ isVisible: false }),
}));