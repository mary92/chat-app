
import { sendMessageRequest, ISendMessageRequest } from '../utils/request-helper';

// Actions
export const onSendMessage = (message: string, author: string): void => {
    const request: ISendMessageRequest = { message, author };
    sendMessageRequest(request);
};