import {
    Api,
    AuthenticationResponse,
    IssueRequest,
    IssueType,
    ProjectResponse,
    Severity, SeverityLevel,
    Status,
    UsernameList
} from "../apis/bugsbyApi";
import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";
import {useNavigate, useParams} from "react-router-dom";
import BugsbyDrawer from "../components/BugsbyDrawer";
import AddIssueDialog from "../components/AddIssueDialog";
import {issueTypesMatch, severitiesMatch} from "../utils";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const AddIssuePage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<IssueRequest>({});
    const [project, setProject] = useState<ProjectResponse>({});
    const [usernames, setUsernames] = useState<UsernameList>({});
    const [selectedUsernameAssignee, setSelectedUsernameAssignee] = useState<string>();

    const [suggestedSeverity, setSuggestedSeverity] = useState<SeverityLevel>();
    const [suggestedType, setSuggestedType] = useState<IssueType>();
    const [openAddIssueModel, setOpenAddIssueModel] = useState(false);

    useEffect(() => {
        authenticationResponse.jwt && api.projects.getProjectById(+id!)
            .then(response => {
                setProject(response.data);
                setIssue((prev) => ({
                    ...prev,
                    title: prev.title ? prev.title : "",
                    description: prev.description ? prev.description : "",
                    projectId: response.data.id,
                    status: Status.TO_DO,
                    reporterId: authenticationResponse.user?.id
                }));
            })
            .then(() => api.users.getUsernames())
            .then(response => setUsernames(response.data))
            .catch(() => navigate("/error"));
    }, [authenticationResponse, api.projects, api.users, id, navigate]);

    const handleSaveButtonClicked = () => {
        api.ai.getSuggestedSeverity({title: issue.title})
            .then(severity => {
                setSuggestedSeverity(severity.data.severity);
                api.ai.getSuggestedType({title: issue.title})
                    .then(issueType => {
                        setSuggestedType(issueType.data.type);
                        if (severity.data.severity && issueType.data.type) {
                            const toOpen = !(severitiesMatch(issue.severity, severity.data.severity) && issueTypesMatch(issue.type, issueType.data.type));
                            if (toOpen) {
                                setOpenAddIssueModel(true);
                            } else {
                                handleConfirmAddIssueModel();
                            }
                        }
                    });
            })
    };

    const handleConfirmAddIssueModel = () => {
        // todo open duplicates modal
        api.issues.addIssue(issue)
            .then(() => setOpenAddIssueModel(false))
            .then(() => setSnackbarProps({
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
                    action: <>{error.message}</>
                }
            }));
    };

    const content = (
        <Box className={styles.formBox}>
            <Typography className={styles.title}>
                Add a new issue
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
                value={issue.title ? issue.title : ""}
                onChange={(e) => setIssue((prev) => ({...prev, title: e.target.value}))}
            />
            <TextField
                className={styles.textField}
                variant={"outlined"}
                label={"Description"}
                value={issue.description ? issue.description : ""}
                onChange={(e) => setIssue((prev) => ({...prev, description: e.target.value}))}
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
                value={issue.severity ? issue.severity.valueOf() : null}
                options={Object.values(Severity)}
                onChange={(event: any, newValue: string | null) =>
                    setIssue(({...issue, severity: newValue as Severity}))}
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
                value={issue.type ? issue.type.valueOf() : null}
                options={Object.values(IssueType)}
                onChange={(event: any, newValue: string | null) =>
                    setIssue(({...issue, type: newValue as IssueType}))}
            />
            {
                issue.type === IssueType.BUG ?
                    <>
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Expected behaviour"}
                            value={issue.expectedBehaviour ? issue.expectedBehaviour : ""}
                            onChange={(e) => setIssue((prev) => ({...prev, expectedBehaviour: e.target.value}))}
                        />
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Actual behaviour"}
                            value={issue.actualBehaviour ? issue.actualBehaviour : ""}
                            onChange={(e) => setIssue((prev) => ({...prev, actualBehaviour: e.target.value}))}
                        />
                        <TextField
                            className={styles.textField}
                            variant={"outlined"}
                            label={"Stack trace"}
                            maxRows={Infinity}
                            value={issue.stackTrace ? issue.stackTrace : ""}
                            onChange={(e) => setIssue((prev) => ({...prev, stackTrace: e.target.value}))}
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
                onChange={(event: any, newValue: string | null) => {
                    setSelectedUsernameAssignee(newValue ? newValue : "");
                    if (newValue) {
                        api.users.getUserByUsername({username: newValue})
                            .then(response => setIssue((prev) => ({...prev, assigneeId: response.data.id})))
                    } else {
                        setIssue((prev) => ({...prev, assigneeId: undefined}));
                    }
                }}
            />
            <Button
                variant={"contained"}
                onClick={handleSaveButtonClicked}
                className={styles.button}
            >
                Save
            </Button>
            {
                (suggestedType && suggestedSeverity) ?
                    <AddIssueDialog
                        suggestedSeverity={suggestedSeverity}
                        suggestedType={suggestedType}
                        issue={issue}
                        open={openAddIssueModel}
                        setOpen={setOpenAddIssueModel}
                        handleConfirm={handleConfirmAddIssueModel}
                    /> :
                    null
            }
        </Box>
    );

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: issue.type === IssueType.BUG ? "100%" : "100vh"}}
        />
    )
};

export default AddIssuePage;
