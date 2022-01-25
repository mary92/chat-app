export interface IListMessageEntry {
    _id: string;
    message: string;
    author: string;
    timestamp: number,
    token: string;
}

export type IListMessageResponse = IListMessageEntry[];

export const listMessagesRequest =
    async (firstMessagesFetched: boolean, initialTimeStamp: number = 0): Promise<IListMessageResponse> => {
        const queryParams = `?token=u4wbEFmRn3Et${!firstMessagesFetched ? '' : `&since=${initialTimeStamp}&limit=100`}`;
        const res = await fetch(`https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0${queryParams}`);
        const jsonResult = await res.json();
        return jsonResult as IListMessageResponse;
    }

export interface ISendMessageRequest {
    message: string;
    author: string;
}

export interface ISendMessageResponse {
    _id: string;
    message: string;
    author: string;
    timestamp: number,
    token: string;
}

export const sendMessageRequest =
    async (requestBody:ISendMessageRequest): Promise<ISendMessageResponse> => {
        const rawResponse = await fetch('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=u4wbEFmRn3Et', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const content = await rawResponse.json();

        return content as ISendMessageResponse;
    }