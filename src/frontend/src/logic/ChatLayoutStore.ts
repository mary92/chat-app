import { action, observable } from 'mobx';

export interface IChatBubbleView {
    author: string;
    message: string;
    timestamp: string;
    direction: string;
}

export interface IChatLayoutStore {
    chatBubblesDataInitial: IChatBubbleView[];
}

export const createChatLayoutStore = (
    chatBubblesDataInitial: IChatBubbleView[]
): IChatLayoutStore => {
    return observable({
        chatBubblesDataInitial
    });
};

// Actions

export const updateChatBubblesData: (
    store: IChatLayoutStore,
    chatBubblesData: IChatBubbleView[]
) => void = action((store: IChatLayoutStore, chatBubblesData: IChatBubbleView[]): void => {
    store.chatBubblesDataInitial = store.chatBubblesDataInitial.concat(chatBubblesData);
});