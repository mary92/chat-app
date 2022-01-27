
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


export interface IAuthorNamePopUpPros{
    handleClose: () => void;
    open: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
}

export const AuthorNamePopUp = (props: IAuthorNamePopUpPros): JSX.Element => {
    return <div>
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Enter author name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your name
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          // type="email"
          fullWidth
          variant="standard"
          inputRef={props.inputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Confirm</Button>
      </DialogActions>
    </Dialog>
  </div>;
}