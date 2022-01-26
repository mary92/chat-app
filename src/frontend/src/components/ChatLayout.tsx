
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
        // borderRadius: "10px",
        margin: "8px",
        padding: "16px",
        display: "inline-block",
        background: "#ffffff",
        maxWidth: "420px",
        wordWrap: "break-word",
        ['@media (max-width:538px)']: {
            maxWidth: "240px",
        }
    },
    myBubble: {
        background: "#fcf6c5"
    }
}));

const ChatLayoutInternal = (props: IChatLayoutProps): JSX.Element => {
    const classes = useStyles();
    const resultData = props.store.chatBubblesDataInitial.slice().reverse();

    const chatBubbles = resultData.map((obj, i = 0) => {
        const fromCurrentUser = obj.author === props.store.currentUser;
        return <div className={`${classes.bubbleContainer}`}
            style={{ justifyContent: fromCurrentUser ? 'flex-end' : 'flex-start' }}
            key={i} role={"list"}>
            <div key={i++} className={`${classes.bubble} ${fromCurrentUser ? classes.myBubble : ""}`}
                aria-label={`${!fromCurrentUser ? obj.author : ""} ${obj.message} ${obj.timestamp}`}
                role={"listitem"}>
                {!fromCurrentUser && <div>{obj.author}</div>}
                <div>{obj.message}</div>
                <div>{obj.timestamp}</div>
            </div>
        </div >;
    }
    );

    return <Stack direction='row' alignItems='center' justifyContent='center'
        sx={{ marginLeft: '24px', marginRight: '24px' }}>
        <Stack sx={{maxWidth: '640px', width: '100%', bottom: "70px"}}
            direction="column-reverse"
        >{chatBubbles}
        </Stack>
    </Stack>
};

export const ChatLayout = observer(ChatLayoutInternal);