import { currentUser } from '../utils/response-converter';
import { sendMessageRequest,ISendMessageRequest } from '../utils/request-helper';

// Actions
export const onSendMessage = (message: string): void => {
    const request: ISendMessageRequest = { message, author: currentUser };
    sendMessageRequest(request);
};