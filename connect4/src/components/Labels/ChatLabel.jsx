import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

/**
 * Create label for public chat with number of online users.
 *
 * @param {*} props
 * @return {React.Component}
 */
const ChatLabel = ({ count }) => {
  return (
    <Grid container>
      <Stack spacing={1} ml={1} mb={1}>
        <Typography variant='h6' color='theme.primary'>
          Public Chat
        </Typography>
        <Typography variant='h7' color='secondary'>
          {count} members online
        </Typography>
      </Stack>
    </Grid>
  );
};

export default ChatLabel;
