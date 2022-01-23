import { IChatBubbleView } from "src/logic/ChatLayoutStore";
import { IListMessageResponse } from "./request-helper";

const currentUser = "Tom";

export const convertListMessageResponseToIChatBubbleViewArray = (response: IListMessageResponse): IChatBubbleView[] => {
    const chatBubbleViewArray : IChatBubbleView[] = [];

    response.reverse().forEach(responseEntry => {
        chatBubbleViewArray.push({
            author: responseEntry.author,
            message: responseEntry.message,
            timestamp: new Date(responseEntry.timestamp).toISOString(),
            direction: currentUser === responseEntry.author ? "right" :"left"
          });
    });

    return chatBubbleViewArray;
};