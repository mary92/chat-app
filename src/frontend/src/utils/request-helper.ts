export interface IListMessageEntry {
    _id: string;
    message: string;
    author : string;
    timestamp: number,
    token: string;
}

export type IListMessageResponse = IListMessageEntry[];

export const listMessagesRequest = async (): Promise<IListMessageResponse> => {
    const res = await fetch("https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=u4wbEFmRn3Et");
    const jsonResult =  await res.json();
    return jsonResult as IListMessageResponse;
}