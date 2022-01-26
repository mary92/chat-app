import {  observable } from 'mobx';
import { IChatLayoutStore } from './ChatLayoutStore';



export interface IAppStore {
    chatLayoutStore: IChatLayoutStore
}

export const createAppStore = (
    chatLayoutStore: IChatLayoutStore
): IAppStore => {
    return observable({
        chatLayoutStore
    });
};

// Actions