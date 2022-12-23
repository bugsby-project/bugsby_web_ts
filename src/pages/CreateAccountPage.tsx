import {Dispatch, FC, SetStateAction, useState} from "react";
import {Api, UserRequest} from "../apis/bugsbyApi";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {Box, Button, TextField, Typography} from "@mui/material";
import BugsbyLogo from "../components/BugsbyLogo";
import styles from "../styles/styles.module.css";
import {Link} from "react-router-dom";

interface Props {
    api: Api<any>,
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>
}

const CreateAccountPage: FC<Props> = ({api, setSnackbarProps}) => {
    const [userRequest, setUserRequest] = useState<UserRequest>({});

    const handleButtonClicked = () => api.users.createAccount(userRequest)
        .then(response => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "success",
                action: <>Created account successfully</>
            }
        }))
        .catch(error => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "error",
                action: <>{error.response.data.message}</>
            }
        }))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3vh"
            }}
            className={styles.content}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly"
                }}
            >
                <BugsbyLogo
                    logoColor={"black"}
                    textColor={"#112d4e"}
                />
                <Typography>
                    Already have an account ?&nbsp;
                    <Link
                        to={"/"}
                        className={styles.link}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
            <Box
                className={styles.formBox}
            >
                <Typography className={styles.title}>
                    Create an account
                </Typography>
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"First name"}
                    value={userRequest.firstName ? userRequest.firstName : ""}
                    onChange={(event) => setUserRequest(({...userRequest, firstName: event.target.value}))}
                />
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"Last name"}
                    value={userRequest.lastName ? userRequest.lastName : ""}
                    onChange={(event) => setUserRequest(({...userRequest, lastName: event.target.value}))}
                />
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"Username"}
                    value={userRequest.username ? userRequest.username : ""}
                    onChange={(event) => setUserRequest(({...userRequest, username: event.target.value}))}
                />
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    label={"Email"}
                    value={userRequest.email ? userRequest.email : ""}
                    onChange={(event) => setUserRequest(({...userRequest, email: event.target.value}))}
                />
                <TextField
                    className={styles.textField}
                    variant={"outlined"}
                    type={"password"}
                    label={"Password"}
                    value={userRequest.password ? userRequest.password : ""}
                    onChange={(event) => setUserRequest(({...userRequest, password: event.target.value}))}
                />
                <Button
                    variant={"contained"}
                    onClick={handleButtonClicked}
                    className={styles.button}
                >
                    Create your account
                </Button>
            </Box>
        </Box>
    )
};

export default CreateAccountPage;