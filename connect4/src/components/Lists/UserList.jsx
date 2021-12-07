import { Divider, Grid, List, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { SocketContext } from '../Contexts/SocketContext';
import { UserListItem } from '../../imports/components.imports';

/**
 * Create a list of users in the public chat.
 *
 * @param {*} props
 * @return {React.Component}
 */
const UserList = ({ global }) => {
  const [value, setValue] = useState('');
  const [challengeSent, setChallengeSent] = useState(false);
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const sendChallenge = (username) => {
    console.log('challenge sent');
    if (!challengeSent) {
      socket.emit('challenge-player', username);
    }
    setChallengeSent(true);
  };

  /**
   * Search users in list.
   *
   * @param {*} event
   */
  const valueChange = (event) => {
    setValue(event.target.value.trimLeft());
  };

  /**
   * Filter list of users
   * @returns {React.Component}
   */
  const listOfPlayers = global
    .filter((el) => {
      return (
        el.username !== user.username && el.username.includes(value.trim())
      );
    })
    .map((player) => {
      return (
        <UserListItem
          key={player.username}
          player={player}
          challengeSent={challengeSent}
          sendChallenge={sendChallenge}
        />
      );
    });

  return (
    <Grid item xs={3} style={{ borderRight: '1px solid #E0E0E0' }}>
      <Divider />
      <Grid item xs={12} style={{ padding: '10px' }}>
        <TextField
          id='outlined-basic-email'
          label='Search'
          value={value}
          variant='outlined'
          fullWidth
          onChange={valueChange}
          inputProps={{ maxLength: 15 }}
        />
      </Grid>
      <Divider />
      <List>{listOfPlayers}</List>
    </Grid>
  );
};

export default UserList;
