import { action, observable } from 'mobx';

export interface IChatBubbleView {
    author: string;
    message: string;
    timestamp: string;
    direction: string;
}

export interface IChatLayoutStore {
    chatBubblesData: IChatBubbleView[]
  }

  export const createChatLayoutStore = (
    chatBubblesData: IChatBubbleView[]
  ): IChatLayoutStore => {
    return observable({
        chatBubblesData
    });
  };

  // Actions

  export const updateChatBubblesData: (
    store: IChatLayoutStore,
    chatBubblesData: IChatBubbleView[]
  ) => void = action((store: IChatLayoutStore,chatBubblesData: IChatBubbleView[]): void => {
      store.chatBubblesData = chatBubblesData;
  });