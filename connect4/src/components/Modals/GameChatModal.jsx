import { Badge, Button, Divider, Grid, Menu } from '@mui/material';
import { Box } from '@mui/system';
import MailIcon from '@mui/icons-material/Mail';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../Contexts/SocketContext';
import { useSnackbar } from 'notistack';
import { GameContext } from '../Contexts/GameContext';
import Message from '../../components/Classes/Message';
import ChatMessages from '../../domain/Chat/ChatMessages';

import { ChatTextField, SendButton } from '../../imports/components.imports';

/**
 * Modal screen for game chat.
 *
 * @return {React.Component}
 */
const GameChatModal = () => {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');
  const open = Boolean(anchorEl);
  const messageRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  const socket = useContext(SocketContext);
  const { gameState } = useContext(GameContext);

  /**
   * Reset notifications counter and set the anchor
   * when modal opens.
   *
   * @param {*} event
   */
  const handleOpenChat = (event) => {
    setNotifications(0);
    setAnchorEl(event.currentTarget);
  };

  /**
   * Reset anchor element when modal closes.
   *
   */
  const handleCloseChat = () => {
    setAnchorEl(null);
  };

  /**
   * Set state when user types in the textfield.
   *
   * @param {*} event
   */
  const handleTextFieldValueChange = (event) => {
    setValue(event.target.value.trimLeft());
  };

  /**
   * Automatically scroll to the last message.
   *
   */
  // const scrollToEndMessage = () => {
  //   messageRef.current.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(scrollToEndMessage, [messages]);

  useEffect(() => {
    socket.on('send-game-message', (message) => {
      if (anchorEl === null) {
        setNotifications((prev) => (prev += 1));
      }
      setMessages((prev) => [...prev, Message.fromJSON(message)]);
    });
    return () => socket.off('send-game-message');
  }, [anchorEl, gameState.roomId, socket]);

  /**
   * Trim and send message to the server.
   *
   * @param {*} event
   */
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (value.trim().length > 0) {
      socket.emit('game-message', { message: value, roomId: gameState.roomId });
    } else {
      enqueueSnackbar('Cannot send an empty message', {
        variant: 'warning',
      });
    }
    setValue('');
  };

  /**
   * Create notification label for aria tags.
   * @returns {string}
   */
  const notificationsLabel = () => {
    if (notifications === 0) {
      return 'no notifications';
    } else if (notifications > 99) {
      return 'more than 99 notifications';
    } else {
      return `${notifications} notifications`;
    }
  };

  return (
    <Box>
      <Button
        id='basic-button'
        variant='contained'
        color='secondary'
        aria-label={notificationsLabel}
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        endIcon={
          <Badge color='error' badgeContent={notifications}>
            <MailIcon />
          </Badge>
        }
        onClick={handleOpenChat}
      >
        GAME CHAT
      </Button>
      <Menu
        id='game-chat'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseChat}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Grid item xs={11}>
          <ChatMessages messages={messages} messageRef={messageRef} />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={9}>
              <ChatTextField
                maxLength={20}
                value={value}
                handleTextFieldValueChange={handleTextFieldValueChange}
                handleSendMessage={handleSendMessage}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2} align='right'>
              <SendButton value={value} handleSendMessage={handleSendMessage} />
            </Grid>
          </Grid>
        </Grid>
      </Menu>
    </Box>
  );
};

export default GameChatModal;
