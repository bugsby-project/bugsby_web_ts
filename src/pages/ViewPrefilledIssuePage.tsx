import {
    Api,
    AuthenticationResponse,
    IssueType,
    PrefilledIssueResponse,
    ProjectResponse,
    Severity,
    Status
} from "../apis/bugsbyApi";
import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {useNavigate, useParams} from "react-router-dom";
import BugsbyDrawer from "../components/BugsbyDrawer";
import styles from "../styles/styles.module.css";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const ViewPrefilledIssuePage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {projectId, id} = useParams();
    const navigate = useNavigate();
    const [prefilledIssue, setPrefilledIssue] = useState<PrefilledIssueResponse>({});
    const [project, setProject] = useState<ProjectResponse>({});

    useEffect(() => {
        authenticationResponse.jwt && api.prefilledIssues.getPrefilledIssueById(+id!)
            .then(response => setPrefilledIssue(response.data))
            .then(() => api.projects.getProjectById(+projectId!))
            .then(response => setProject(response.data))
            .catch(() => navigate("/error"));
    }, [id, projectId, api.prefilledIssues, api.projects, authenticationResponse.jwt, navigate]);

    const handleSaveButtonClicked = () => api.issues.addIssue({
        title: prefilledIssue.title,
        description: prefilledIssue.description,
        expectedBehaviour: prefilledIssue.expectedBehaviour,
        actualBehaviour: prefilledIssue.actualBehaviour,
        stackTrace: prefilledIssue.stackTrace,
        severity: prefilledIssue.severity,
        type: prefilledIssue.type,
        status: Status.TO_DO,
        projectId: +projectId!,
        reporterId: authenticationResponse.user?.id,
    })
        .then(response => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "success",
                action: <>{"Saved issue successfully"}</>
            }
        }))
        .catch(error => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "error",
                action: <>{error.response.data.message}</>
            }
        }))

    const content = (
        <Box className={styles.formBox}>
            <Typography className={styles.title}>
                Add a prefilled issue
            </Typography>
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Project"}
                value={project.title ? project.title : ""}
                inputProps={{readOnly: true}}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Title"}
                value={prefilledIssue.title ? prefilledIssue.title : ""}
                onChange={(e) => setPrefilledIssue((prev) => ({...prev, title: e.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Description"}
                value={prefilledIssue.description ? prefilledIssue.description : ""}
                onChange={(e) => setPrefilledIssue((prev) => ({...prev, description: e.target.value}))}
            />
            <Autocomplete
                disablePortal={true}
                className={styles.textField}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Severity"}
                    />
                )}
                value={prefilledIssue.severity ? prefilledIssue.severity.valueOf() : null}
                options={Object.values(Severity)}
                onChange={(event: any, newValue: string | null) =>
                    setPrefilledIssue(({...prefilledIssue, severity: newValue as Severity}))}
            />
            <Autocomplete
                disablePortal={true}
                className={styles.textField}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Type"}
                    />
                )}
                value={prefilledIssue.type ? prefilledIssue.type.valueOf() : null}
                options={Object.values(IssueType)}
                onChange={(event: any, newValue: string | null) =>
                    setPrefilledIssue(({...prefilledIssue, type: newValue as IssueType}))}
            />
            {
                prefilledIssue.type === IssueType.BUG ?
                    <>
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Expected behaviour"}
                            value={prefilledIssue.expectedBehaviour ? prefilledIssue.expectedBehaviour : ""}
                            onChange={(e) => setPrefilledIssue((prev) => ({
                                ...prev,
                                expectedBehaviour: e.target.value
                            }))}
                        />
                        <TextField
                            multiline={true}
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Actual behaviour"}
                            value={prefilledIssue.actualBehaviour ? prefilledIssue.actualBehaviour : ""}
                            onChange={(e) => setPrefilledIssue((prev) => ({...prev, actualBehaviour: e.target.value}))}
                        />
                        <TextField
                            multiline={true}
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Stack trace"}
                            maxRows={Infinity}
                            value={prefilledIssue.stackTrace ? prefilledIssue.stackTrace : ""}
                            onChange={(e) => setPrefilledIssue((prev) => ({...prev, stackTrace: e.target.value}))}
                        />
                    </>
                    :
                    null
            }
            <Button
                variant={"contained"}
                onClick={handleSaveButtonClicked}
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
            contentStyle={{height: "100%"}}
        />
    )
};

export default ViewPrefilledIssuePage;
