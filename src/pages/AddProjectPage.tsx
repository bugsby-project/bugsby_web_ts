import {Api, AuthenticationResponse, ProjectRequest, Role} from "../apis/bugsbyApi";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import BugsbyDrawer from "../components/BugsbyDrawer";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>
}

const AddProjectPage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const [projectRequest, setProjectRequest] = useState<ProjectRequest>({});

    useEffect(() => {
        setProjectRequest(prevState => ({...prevState, userId: authenticationResponse.user?.id}))
    }, [authenticationResponse.user?.id]);

    const handleButtonClicked = () => {
        if (authenticationResponse.jwt) {
            api.projects.createProject(projectRequest)
                .then(result => setSnackbarProps({
                    open: true,
                    alertProps: {
                        severity: "success",
                        action: <>Created project successfully</>
                    }
                }))
                .catch(error => setSnackbarProps({
                    open: true,
                    alertProps: {
                        severity: "error",
                        action: <>{error.response.data.message}</>
                    }
                }))
        }
    };

    const content = (
        <Box
            className={styles.formBox}
        >
            <Typography className={styles.title}>
                Add project
            </Typography>
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Title"}
                value={projectRequest.title ? projectRequest.title : ""}
                onChange={(event) => setProjectRequest(({...projectRequest, title: event.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Description"}
                value={projectRequest.description ? projectRequest.description : ""}
                onChange={(event) => setProjectRequest(({...projectRequest, description: event.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Repository owner"}
                value={projectRequest.repositoryOwner ? projectRequest.repositoryOwner : ""}
                onChange={(event) => setProjectRequest(({...projectRequest, repositoryOwner: event.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Repository name"}
                value={projectRequest.repositoryName ? projectRequest.repositoryName : ""}
                onChange={(event) => setProjectRequest(({...projectRequest, repositoryName: event.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Token"}
                // todo add end adornment to detail the token
                value={projectRequest.token ? projectRequest.token : ""}
                onChange={(event) => setProjectRequest(({...projectRequest, token: event.target.value}))}
            />
            <Autocomplete
                disablePortal={true}
                className={styles.textField}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Your role in the project"}
                    />
                )}
                options={Object.values(Role)}
                onChange={(event: any, newValue: string | null) =>
                    setProjectRequest(({...projectRequest, role: newValue as Role}))}
            />
            <Button
                variant={"contained"}
                onClick={handleButtonClicked}
                className={styles.button}
            >
                Save
            </Button>
        </Box>
    );

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: "100vh"}}
        />
    )
};

export default AddProjectPage;
