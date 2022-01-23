import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';
import { ChatLayout } from './components/ChatLayout';
import { createChatLayoutStore, IChatBubbleView, updateChatBubblesData } from './logic/ChatLayoutStore';
import { IListMessageResponse, listMessagesRequest } from './utils/request-helper';
import { convertListMessageResponseToIChatBubbleViewArray } from './utils/response-converter';

export default function App()
{
  const theme = createTheme();
  const chatBubblesData: IChatBubbleView[] = [
    {
      author: "NINJA",
      message: "Great resource, thanks",
      timestamp: new Date(2018,2,10,9,55).toTimeString(),
      direction: "left"
    }
  ];
  const [store] = useState(createChatLayoutStore(chatBubblesData));

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const listMessageResponse: IListMessageResponse = await listMessagesRequest();
        const chatBubbleViewArray = convertListMessageResponseToIChatBubbleViewArray(listMessageResponse);
        updateChatBubblesData(store, chatBubbleViewArray);
      }
      catch (error) {
        console.log(`Something went wrong with data update`);
      };
    };
    fetchLatestMessages();
    const timer = setInterval(fetchLatestMessages, 500);
    return () => clearInterval(timer);
  }, []);

  return <ThemeProvider theme={theme}>
    <ChatLayout store={store}></ChatLayout>
    <Box sx={{ bgcolor: '#3798d4', width: '100%', position: "fixed", bottom: "0px", height: "70px" }} >
      <Stack spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row">
        <TextField sx={{ bgcolor: '#ffffff', width: '50%' }}></TextField>
        <Button variant="contained" sx={{
          width: 72,
          bgcolor: '#ff876d',
        }}>Send</Button>
      </Stack>
    </Box>
  </ThemeProvider>
}