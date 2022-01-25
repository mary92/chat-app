import { IChatBubbleView } from "src/logic/ChatLayoutStore";
import { IListMessageResponse } from "./request-helper";

export const currentUser = "MC";

export const convertListMessageResponseToIChatBubbleViewArray = (response: IListMessageResponse): IChatBubbleView[] => {
    const chatBubbleViewArray : IChatBubbleView[] = [];

    response.forEach(responseEntry => {
        chatBubbleViewArray.push({
            author: responseEntry.author,
            message: responseEntry.message,
            timestamp: new Date(responseEntry.timestamp).toLocaleString(),
            direction: currentUser === responseEntry.author ? "right" :"left"
          }); 
    });

    return chatBubbleViewArray;
};