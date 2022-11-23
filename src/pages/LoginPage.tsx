import * as React from 'react';
import {Dispatch, FC, SetStateAction, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import styles from "../styles/styles.module.css";
import {Link, useNavigate} from "react-router-dom";
import {Api, AuthenticationRequest, AuthenticationResponse} from "../apis/bugsbyApi";
import {Button, TextField} from "@mui/material";
import BugsbyLogo from "../components/BugsbyLogo";

const drawerWidth = "50%";

interface Props {
    api: Api<any>,
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>,
    setAuthenticationResponse: Dispatch<SetStateAction<AuthenticationResponse>>
}

const LoginPage: FC<Props> = ({api, setSnackbarProps, setAuthenticationResponse}) => {
    const [loginRequest, setLoginRequest] = useState<AuthenticationRequest>({});
    const navigate = useNavigate();

    const handleButtonClicked = () => api.users.login(loginRequest)
        .then(response => {
            setAuthenticationResponse(response.data)
            navigate(`/${response.data.user?.username}`)
        })
        .catch(error => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "error",
                action: <>{error.response.data.message}</>
            }
        }))

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Drawer
                sx={{
                    width: "50%",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "#112d4e",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "1em 4rem"
                    }}>
                    <BugsbyLogo
                        logoColor={"white"}
                        textColor={"white"}
                    />
                    <Typography
                        className={styles.title}
                        sx={{color: "white", fontWeight: "900 !important", marginTop: "4rem"}}
                    >
                        The solution for managing <br/> your projects efficiently
                    </Typography>
                    <Typography
                        className={styles.title}
                        sx={{color: "white", marginTop: "1.5em"}}
                    >
                        Start organising your issues <br/> with Bugsby
                    </Typography>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    backgroundColor: "#f9f7f7",
                    height: "100vh"
                }}
                className={styles.formBox}
            >
                <Typography>
                    Don't have an account ?&nbsp;
                    <Link
                        to={"/create-account"}
                        className={styles.link}
                    >
                        Create one
                    </Link>
                </Typography>
                <Typography
                    className={styles.title}
                    sx={{color: "#112d4e", marginTop: "2em"}}
                >
                    Login
                </Typography>
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"Username"}
                    value={loginRequest.username ? loginRequest.username : ""}
                    onChange={(event) => setLoginRequest(({...loginRequest, username: event.target.value}))}
                />
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"Password"}
                    type={"password"}
                    value={loginRequest.password ? loginRequest.password : ""}
                    onChange={(event) => setLoginRequest(({...loginRequest, password: event.target.value}))}
                />
                <Button
                    variant={"contained"}
                    onClick={handleButtonClicked}
                    className={styles.button}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default LoginPage;