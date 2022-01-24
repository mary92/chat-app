import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';
import { onSendMessage } from '../logic/MessageBarStore';
import { observer } from 'mobx-react';

export interface IMessageBarProps {
}

export const MessageBarInternal = (_props: IMessageBarProps): JSX.Element => {
    // const valueRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = React.useState('');

    const onSendMessageCallback = React.useCallback(() => {
        setMessage('');
        onSendMessage(message);
      }, [message]);

    return <Box sx={{ bgcolor: '#3798d4', width: '100%', position: "fixed", bottom: "0px", height: "70px" }} >
        <Stack spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="row">
            <TextField sx={{ bgcolor: '#ffffff', width: '50%' }}
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      onSendMessageCallback();
                    }
                  }}/>
            <Button variant="contained" sx={{
                width: 72,
                bgcolor: '#ff876d',
            }} onClick={() => onSendMessageCallback()}>Send</Button>
        </Stack>
    </Box>
};

export const MessageBar = observer(MessageBarInternal);