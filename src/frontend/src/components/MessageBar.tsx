import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { onSendMessage } from '../logic/MessageBarStore';
import { observer } from 'mobx-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

export interface IMessageBarProps {
}

const useStyles = makeStyles(() => ({
    input1: {
      height: 30
    },
  }));

export const MessageBarInternal = (_props: IMessageBarProps): JSX.Element => {
    // const valueRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = React.useState('');

    const onSendMessageCallback = React.useCallback(() => {
        setMessage('');
        onSendMessage(message);
      }, [message]);

      const classes = useStyles();

    return <Box sx={{ bgcolor: '#3798d4', width: '100%', position: "fixed", bottom: "0px", height: "63px" }} >
        <Stack 
            justifyContent="center"
            direction="row">
            <Stack spacing={2}
                justifyContent="center"
                // alignItems="center"
                direction="row"
                padding="8px"
                maxWidth={"640px"}
                width={"100%"}>
                <TextField sx={{ bgcolor: '#ffffff', width: '100%' }}
                    id="message-input-field"
                    placeholder="Message"
                    value={message}
                    size="small"
                    variant="outlined"
                    onChange={e => setMessage(e.target.value)}
                    InputProps={{ classes: { input: classes.input1 } }}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            onSendMessageCallback();
                        }
                    }} />
                <Button variant="contained" sx={{
                    width: 72,
                    bgcolor: '#ff876d',
                }} onClick={() => onSendMessageCallback()}>Send</Button>
            </Stack>
        </Stack>
    </Box>
};

export const MessageBar = observer(MessageBarInternal);