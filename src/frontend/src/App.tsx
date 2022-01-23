import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChatLayout } from './components/ChatLayout';
import { createChatLayoutStore, updateChatBubblesData } from './logic/ChatLayoutStore';
import { IListMessageResponse, listMessagesRequest } from './utils/request-helper';
import { convertListMessageResponseToIChatBubbleViewArray } from './utils/response-converter';
import { MessageBar } from './components/MessageBar';

export default function App() {
  const theme = createTheme();
  const [store] = useState(createChatLayoutStore([], []));
  const [allMessagesFetched, setAllMessagesFetched] = useState(false);
  const [initialTimeStamp] = useState(Date.now());

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const listMessageResponse: IListMessageResponse = await listMessagesRequest(allMessagesFetched, initialTimeStamp);
        const chatBubbleViewArray = convertListMessageResponseToIChatBubbleViewArray(listMessageResponse);
        updateChatBubblesData(store, chatBubbleViewArray, allMessagesFetched);
        setAllMessagesFetched(true);
      }
      catch (error) {
        console.log(`Something went wrong with data update`);
      };
    };
    fetchLatestMessages();
    const timer = setInterval(fetchLatestMessages, 500);
    return () => clearInterval(timer);
  }, [allMessagesFetched, initialTimeStamp]);

  return <ThemeProvider theme={theme}>
    <ChatLayout store={store}></ChatLayout>
    <MessageBar></MessageBar>
  </ThemeProvider>
}