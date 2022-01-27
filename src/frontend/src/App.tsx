import React, { useEffect, useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChatLayout } from './components/ChatLayout';
import { IChatLayoutStore, updateChatBubblesData, updateCurrentUser } from './logic/ChatLayoutStore';
import { IListMessageResponse, listMessagesRequest } from './utils/request-helper';
import { convertListMessageResponseToIChatBubbleViewArray } from './utils/response-converter';
import { MessageBar } from './components/MessageBar';
import Image from './assets/images/Body.png'
import { observer } from 'mobx-react';
import { IAppStore } from './logic/AppStore';
import { AuthorNamePopUp } from './components/AUthorNamePopUp';

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
    // console.log("fetchLatestMessages "+new Date(initialTimeStamp) + " firstPartFetched " + firstPartFetched);
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

export interface IAppProps {
  store: IAppStore;
}

const AppInternal = (props: IAppProps): JSX.Element => {
  const theme = createTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    if (inputRef.current?.value)
    {
      updateCurrentUser(props.store.chatLayoutStore, inputRef.current?.value || "");
    }
  };

  useEffect(() => {
    fetchLatestMessages(props.store.chatLayoutStore)
      .then(() => {
        setInterval(() => fetchLatestMessages(props.store.chatLayoutStore), 500);
      });
      setOpen(true);
  }, []);

  return <ThemeProvider theme={theme}>
    <div style={{
      overflowY: "scroll",
      height: "calc(100vh - 63px)",
      backgroundImage: `url(${Image})`
    }}
      ref={messagesEndRef}>
      <ChatLayout store={props.store.chatLayoutStore}></ChatLayout>
      <MessageBar chatLayoutStore={props.store.chatLayoutStore}></MessageBar>
    </div>
    {/* Helper to enter author name */}
    <AuthorNamePopUp open={open} handleClose={handleClose} inputRef={inputRef}/>
  </ThemeProvider>
}

export const App = observer(AppInternal);