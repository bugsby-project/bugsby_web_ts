import * as React from 'react';
import {FC} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BugsbyLogo from "./BugsbyLogo";
import MenuOptionListItem from "./MenuOptionListItem";
import {CodeOutlined, LogoutOutlined, PestControlOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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

interface Props {
    content: React.ReactNode;
    contentClassName?: string;
}

const BugsbyDrawer: FC<Props> = ({content, contentClassName}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open} sx={{backgroundColor: "#112d4e"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link to={"/"} className={styles.link}>
                        <BugsbyLogo logoColor={"white"} textColor={"white"}/>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{backgroundColor: "#112d4e"}}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon htmlColor={"white"}/> : <ChevronLeftIcon htmlColor={"white"}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider color={"#112d4e"}/>
                <List sx={{backgroundColor: "#112d4e", height: "100vh"}}>
                    <MenuOptionListItem
                        icon={<CodeOutlined htmlColor={"white"} fontSize={"large"}/>}
                        content={"Projects"}
                        // todo replace with proper values
                        linkPath={"/"}
                    />
                    <MenuOptionListItem
                        icon={<PestControlOutlined htmlColor={"white"} fontSize={"large"}/>}
                        content={"Issues"}
                        linkPath={"/"}
                    />
                </List>
                <List style={{marginTop: "auto", backgroundColor: "#112d4e"}}>
                    <MenuOptionListItem
                        icon={<LogoutOutlined htmlColor={"white"} fontSize={"large"}/>}
                        content={"Logout"}
                        linkPath={"/"}
                    />
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {content}
            </Box>
        </Box>
    );
}

export default BugsbyDrawer;