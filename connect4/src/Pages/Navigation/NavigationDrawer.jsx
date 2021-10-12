import React, { useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Home from '../Home/Home';
import { withSnackbar } from 'notistack';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

 function NavigationDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleOpenDrawer = () => {
        setOpen(true);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const activePage = () => {
        switch (page) {
            case 0: 
                return <Home />
            case 2: 
                return <div>Page 2</div>
            default: 
                return <div>Page 3</div>
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton 
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpenDrawer}
                        edge="start"
                        sx= {{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" style={{ flex: 1}}>
                        Connect 4
                    </Typography>
                    <Box>
                        <AmplifySignOut />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} onClick={handleCloseDrawer}>
                <DrawerHeader>
                    <IconButton>
                        { theme.direction === 'trl' ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon /> }
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button key={'Home'} onClick={() => {setPage(0)}}>
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    
                    <ListItem button key={'Leaderboard'} onClick={() => {setPage(1)}}>
                        <ListItemIcon>
                            <LeaderboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Leaderboard'} />
                    </ListItem>

                    <ListItem button key={'Game History'} onClick={() => {setPage(2)}}>
                        <ListItemIcon>
                            <BookmarksRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Game History'} />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {activePage()}
            </Box>
            
        </Box>
    );
}

export default withSnackbar(NavigationDrawer);