import React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

export default function App()
{
    // Backgrond image
    //   MessageBubble array - others positioned left, mine right
    //   Bottom bar
    //     Text field
    //     Send button
    const theme = createTheme({
        components: {
          // Name of the component
          MuiContainer: {
            styleOverrides: {
              // Name of the slot
              maxWidthSm: {
                // Some CSS
                fontSize: '1rem',
              },
            },
          },
        },
      });

    return <ThemeProvider theme={theme}>
        <Stack spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ bgcolor: '#cfe8fc' }}>
            <Box sx={{ bgcolor: '#eeeeee', height: '100vh', width: '640px' }} >
            </Box>
            <Box sx={{ bgcolor: '#3798d4', width: '100%', position: "fixed", bottom: "0px" }} >
                <Stack spacing={2}
                    justifyContent="center"
                    alignItems="center" 
                    direction="row">
                    <TextField sx={{ bgcolor: '#ffffff' }}></TextField>
                    <Button></Button>
                </Stack>
            </Box>
        </Stack>
    </ThemeProvider>
}