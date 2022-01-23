
import React from 'react';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from "@mui/styles";
import Stack from '@mui/material/Stack';
import { IChatLayoutStore } from 'src/logic/ChatLayoutStore';

export interface IChatLayoutProps {
    store: IChatLayoutStore;
}

const useStyles = makeStyles((_theme: Theme) => createStyles({
    bubbleContainer: {
        width: "100%",
        display: "flex"
    },
    bubble: {
        border: "0.5px solid black",
        borderRadius: "10px",
        margin: "5px",
        padding: "10px",
        display: "inline-block"
    }
}));

const ChatLayoutInternal = (props: IChatLayoutProps): JSX.Element => {
    const classes = useStyles();

    const chatBubbles = props.store.chatBubblesData.map((obj, i = 0) => (
        <div className={`${classes.bubbleContainer}`}
            style={{ justifyContent: obj.direction === "right" ? 'flex-end' : 'flex-start' }}
            key={i} >
            <div key={i++} className={classes.bubble}>
                <div>{obj.author}</div>
                <div>{obj.message}</div>
                <div>{obj.timestamp}</div>
            </div>
        </div >
    ));
    return <Stack sx={{ bgcolor: '#aaaaaa' }} direction='row' alignItems='center' justifyContent='center' >
        <Stack sx={{ bgcolor: '#eeeeee', height: 'calc(100vh - 70px)', maxWidth: '640px', width: '100%', bottom: "70px", overflowY: 'scroll' }}
            direction="column-reverse"
        >{chatBubbles}
        </Stack>
    </Stack>
};

export const ChatLayout = observer(ChatLayoutInternal);