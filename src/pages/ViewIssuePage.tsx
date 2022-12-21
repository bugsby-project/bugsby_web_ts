import {
    Api,
    AuthenticationResponse,
    IssueRequest,
    IssueResponse,
    IssueType,
    ProjectResponse,
    Severity,
    Status,
    UsernameList,
    UserResponse
} from "../apis/bugsbyApi";
import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import BugsbyDrawer from "../components/BugsbyDrawer";
import styles from "../styles/styles.module.css";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {emptyPromise, getIssueIcon} from "../utils";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const ViewIssuePage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<IssueResponse>({});
    const [project, setProject] = useState<ProjectResponse>({});
    const [assignee, setAssignee] = useState<UserResponse>({});
    const [reporter, setReporter] = useState<UserResponse>({});
    const [usernames, setUsernames] = useState<UsernameList>({});
    const [issueRequest, setIssueRequest] = useState<IssueRequest>({});
    const [selectedUsernameAssignee, setSelectedUsernameAssignee] = useState<string>();

    useEffect(() => {
        authenticationResponse.jwt && api.issues.getIssueById(+id!)
            .then(response => {
                setIssue(response.data);
                return response.data
            })
            .then(issueResponse => {
                setIssueRequest({
                    title: issueResponse.title,
                    description: issueResponse.description,
                    expectedBehaviour: issueResponse.expectedBehaviour,
                    actualBehaviour: issueResponse.actualBehaviour,
                    stackTrace: issueResponse.stackTrace,
                    severity: issueResponse.severity,
                    type: issueResponse.type,
                    status: issueResponse.status,
                    projectId: issueResponse.projectId,
                    reporterId: issueResponse.reporterId,
                    assigneeId: issueResponse.assigneeId
                })
                api.projects.getProjectById(issueResponse.projectId!)
                    .then(response => setProject(response.data))
                    .then(() => api.users.getUsernames())
                    .then(response => setUsernames(response.data))
                    .then(() => api.users.getUserById(issueResponse.reporterId!))
                    .then(response => setReporter(response.data))
                    .then(() => issueResponse.assigneeId ?
                        api.users.getUserById(issueResponse.assigneeId)
                            .then(response => {
                                setAssignee(response.data);
                                setSelectedUsernameAssignee(response.data.username!);
                            }) :
                        {})
            })
            .catch(() => navigate("/error"));
    }, [authenticationResponse.jwt, api.issues, api.projects, api.users, navigate, id]);

    const handleDeleteButtonClicked = () => api.issues.deleteIssue(+id!)
        .then(() => {
            navigate(`/projects/${project.id}`);
            setSnackbarProps({
                open: true,
                alertProps: {
                    severity: "success",
                    action: <>{"Deleted issue successfully"}</>
                }
            })
        })
        .catch(error => setSnackbarProps({
            open: true,
            alertProps: {
                severity: "error",
                action: <>{error.message}</>
            }
        }));

    // todo fix
    const handleUpdateButtonClicked = () => {
        console.log(selectedUsernameAssignee);
        (selectedUsernameAssignee ?
            api.users.getUserByUsername({username: selectedUsernameAssignee})
                .then(response => setIssueRequest(prev => ({...prev, assigneeId: response.data.id})))
            : emptyPromise)
            .then(() => api.issues.updateIssue(issue.id!, issueRequest))
            .then(() => setSnackbarProps({
                open: true,
                alertProps: {
                    severity: "success",
                    action: <>{"Updated issue successfully"}</>
                }
            }))
            .catch(error => setSnackbarProps({
                open: true,
                alertProps: {
                    severity: "error",
                    action: <>{error.message}</>
                }
            }))
    };

    const content = (
        <Box className={styles.formBox}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: "5px"}}>
                    {getIssueIcon(issue)}
                    <Typography className={styles.title}>
                        {issue.title}
                    </Typography>
                </Box>
                <Button
                    variant={"outlined"}
                    className={styles.deleteButton}
                    onClick={handleDeleteButtonClicked}
                >
                    Delete
                </Button>
            </Box>
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
                label={"Reporter"}
                value={reporter.username ? reporter.username : ""}
                inputProps={{readOnly: true}}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Title"}
                value={issueRequest.title ? issueRequest.title : ""}
                onChange={(e) => setIssueRequest((prev) => ({...prev, title: e.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Description"}
                value={issueRequest.description ? issueRequest.description : ""}
                onChange={(e) => setIssueRequest((prev) => ({...prev, description: e.target.value}))}
            />
            <Autocomplete
                disablePortal={true}
                className={styles.textField}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Status"}
                    />
                )}
                value={issueRequest.status ? issueRequest.status.valueOf() : Status.TO_DO.valueOf()}
                options={Object.values(Status)}
                onChange={(event: any, newValue: string | null) =>
                    setIssueRequest(({...issueRequest, status: newValue as Status}))}
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
                value={issueRequest.severity ? issueRequest.severity.valueOf() : Severity.TRIVIAL.valueOf()}
                options={Object.values(Severity)}
                onChange={(event: any, newValue: string | null) =>
                    setIssueRequest(({...issueRequest, severity: newValue as Severity}))}
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
                value={issueRequest.type ? issueRequest.type.valueOf() : IssueType.ENHANCEMENT.valueOf()}
                options={Object.values(IssueType)}
                onChange={(event: any, newValue: string | null) =>
                    setIssueRequest(({...issueRequest, type: newValue as IssueType}))}
            />
            {
                issueRequest.type === IssueType.BUG ?
                    <>
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Expected behaviour"}
                            value={issueRequest.expectedBehaviour ? issueRequest.expectedBehaviour : ""}
                            onChange={(e) => setIssueRequest((prev) => ({...prev, expectedBehaviour: e.target.value}))}
                        />
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Actual behaviour"}
                            value={issueRequest.actualBehaviour ? issueRequest.actualBehaviour : ""}
                            onChange={(e) => setIssueRequest((prev) => ({...prev, actualBehaviour: e.target.value}))}
                        />
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Stack trace"}
                            maxRows={Infinity}
                            value={issueRequest.stackTrace ? issueRequest.stackTrace : ""}
                            onChange={(e) => setIssueRequest((prev) => ({...prev, stackTrace: e.target.value}))}
                        />
                    </>
                    :
                    null
            }
            <Autocomplete
                disablePortal={true}
                className={styles.textField}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Assignee"}
                    />
                )}
                options={usernames.usernames ? usernames.usernames : []}
                value={selectedUsernameAssignee ? selectedUsernameAssignee : null}
                onChange={(event: any, newValue: string | null) => setSelectedUsernameAssignee(newValue ? newValue : "")}
            />
            <Button
                variant={"contained"}
                onClick={handleUpdateButtonClicked}
                className={styles.button}
            >
                Update
            </Button>
        </Box>
    );

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: issueRequest.type === IssueType.BUG ? "100%" : "100vh"}}
        />
    )
};

export default ViewIssuePage;
