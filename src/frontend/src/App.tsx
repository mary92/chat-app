import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChatLayout } from './components/ChatLayout';
import { createChatLayoutStore, IChatLayoutStore, updateChatBubblesData } from './logic/ChatLayoutStore';
import { IListMessageResponse, listMessagesRequest } from './utils/request-helper';
import { convertListMessageResponseToIChatBubbleViewArray } from './utils/response-converter';
import { MessageBar } from './components/MessageBar';
import Image from './assets/images/Body.png'

let firstMessagesFetched = false;
let initialTimeStamp = Date.now();


const fetchLatestMessages = async (store: IChatLayoutStore) => {
  try {
    // Keep fetching messages until <100 is retrieved
    // memorize timestamp
    let listMessageResponse: IListMessageResponse = [];
    let numberOfResponses = 101;
    let firstPartFetched = firstMessagesFetched;
    let currentRequestTImestamp = initialTimeStamp;
    while (numberOfResponses >= 100) {
      const listMessageResponsePart: IListMessageResponse = await listMessagesRequest(firstPartFetched, currentRequestTImestamp);
      numberOfResponses = listMessageResponsePart.length;
      if (numberOfResponses != 0) {
        listMessageResponse = listMessageResponse.concat(listMessageResponsePart);
        currentRequestTImestamp = listMessageResponsePart[listMessageResponsePart.length - 1].timestamp;
        firstPartFetched = true;
      }
    }
    const chatBubbleViewArray = convertListMessageResponseToIChatBubbleViewArray(listMessageResponse);
    updateChatBubblesData(store, chatBubbleViewArray);
    firstMessagesFetched = true;
    initialTimeStamp = currentRequestTImestamp;
  }
  catch (error) {
    console.log(`Something went wrong with data update`);
  };
};

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`
  }
};

export default function App() {
  const theme = createTheme();
  const [store] = useState(createChatLayoutStore([]));

  useEffect(() => {
    fetchLatestMessages(store);
    const timer = setInterval(() =>fetchLatestMessages(store), 500);
    return () => clearInterval(timer);
  }, []);

  return <ThemeProvider theme={theme}>
    <div style={styles.paperContainer}>
      <ChatLayout store={store}></ChatLayout>
      <MessageBar></MessageBar>
    </div>
  </ThemeProvider>
}