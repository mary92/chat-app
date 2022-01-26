import { action, observable } from 'mobx';

export interface IChatBubbleView {
    author: string;
    message: string;
    timestamp: string;
}

export interface IChatLayoutStore {
    chatBubblesDataInitial: IChatBubbleView[];
    currentUser: string;
}

export const createChatLayoutStore = (
    chatBubblesDataInitial: IChatBubbleView[]
): IChatLayoutStore => {
    return observable({
        chatBubblesDataInitial,
        currentUser: "MC"
    });
};

// Actions

export const updateChatBubblesData: (
    store: IChatLayoutStore,
    chatBubblesData: IChatBubbleView[]
) => void = action((store: IChatLayoutStore, chatBubblesData: IChatBubbleView[]): void => {
    store.chatBubblesDataInitial = store.chatBubblesDataInitial.concat(chatBubblesData);
});

export const updateCurrentUser: (
    store: IChatLayoutStore,
    currentUser: string
) => void = action((store: IChatLayoutStore, currentUser: string): void => {
    store.currentUser = currentUser;
});
