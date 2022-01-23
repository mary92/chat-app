import { action, observable } from 'mobx';

export interface IChatBubbleView {
    author: string;
    message: string;
    timestamp: string;
    direction: string;
}

export interface IChatLayoutStore {
    chatBubblesDataInitial: IChatBubbleView[];
    chatBubblesDataDiff: IChatBubbleView[];
  }

  export const createChatLayoutStore = (
    chatBubblesDataInitial: IChatBubbleView[], 
    chatBubblesDataDiff: IChatBubbleView[]
  ): IChatLayoutStore => {
    return observable({
        chatBubblesDataInitial,
        chatBubblesDataDiff
    });
  };

  // Actions

  export const updateChatBubblesData: (
    store: IChatLayoutStore,
    chatBubblesData: IChatBubbleView[],
    allMessagesFetched: boolean
  ) => void = action((store: IChatLayoutStore,chatBubblesData: IChatBubbleView[], allMessagesFetched: boolean): void => {
      if (!allMessagesFetched)
      {
        store.chatBubblesDataInitial = chatBubblesData;
      }
      else
      {
        store.chatBubblesDataDiff = chatBubblesData;
      }
  });