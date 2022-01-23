import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

export const MessageBar = () => {
    return <Box sx={{ bgcolor: '#3798d4', width: '100%', position: "fixed", bottom: "0px", height: "70px" }} >
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
}