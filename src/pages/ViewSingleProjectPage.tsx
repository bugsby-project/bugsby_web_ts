import {
    Api,
    AuthenticationResponse,
    InvolvementsList,
    InvolvementsRequest,
    IssueList,
    ProjectResponse,
    UsernameList
} from "../apis/bugsbyApi";
import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {useNavigate, useParams} from "react-router-dom";
import BugsbyDrawer from "../components/BugsbyDrawer";
import styles from "../styles/styles.module.css";
import {Box, Button, Typography} from "@mui/material";
import ParticipantDisplay from "../components/ParticipantDisplay";
import Divider from "@mui/material/Divider";
import AddParticipantDialog from "../components/AddParticipantDialog";
import IssueDisplay from "../components/IssueDisplay";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const getUsernamesNotInProject = (allUsernames: UsernameList, involvements: InvolvementsList) => {
    const usernamesInProject = involvements.involvements?.map(i => i.user?.username);
    const result = usernamesInProject ?
        allUsernames.usernames?.filter(u => usernamesInProject.indexOf(u) < 0)
        : [];
    return {
        usernames: result
    };
};

const ViewSingleProjectPage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<ProjectResponse>({});
    const [involvements, setInvolvements] = useState<InvolvementsList>({});
    const [issues, setIssues] = useState<IssueList>({});

    const [open, setOpen] = useState(false);
    const [usernames, setUsernames] = useState<UsernameList>({});
    const [involvementsRequest, setInvolvementsRequest] = useState<InvolvementsRequest>({
        projectId: +id!,
        requesterId: authenticationResponse.user?.id
    });

    useEffect(() => {
            authenticationResponse.jwt &&
            api.projects.getProjectById(+id!)
                .then(response => setProject(response.data))
                .then(() => api.projects.getInvolvementsByProjectId(+id!))
                .then(response => setInvolvements(response.data))
                .then(() => api.projects.getIssuesByProjectId(+id!))
                .then(response => setIssues(response.data))
                .then(() => api.users.getUsernames())
                .then(response => setUsernames(response.data))
                .catch(() => navigate("/error"));
            setInvolvementsRequest((prevState) => ({...prevState, requesterId: authenticationResponse.user?.id}));
        }
        , [id, api.projects, api.users, authenticationResponse, navigate])

    const handleButtonClicked = () => setOpen(true);
    const handleConfirm = () => {
        authenticationResponse.jwt &&
        api.involvements.addParticipant(involvementsRequest)
            .then(() => setSnackbarProps({
                open: true,
                alertProps: {
                    severity: "success",
                    action: <>Added participant successfully</>
                }
            }))
            .then(() => setOpen(false))
            .catch(error => setSnackbarProps({
                open: true,
                alertProps: {
                    severity: "error",
                    action: <>{error.response.data.message}</>
                }
            }))
    }

    const handleIssueButtonClicked = () => navigate(`/projects/${project.id}/add-issue`);

    const content = (
        <Box className={styles.formBox}>
            <Typography className={styles.title}>
                {project.title}
            </Typography>
            <Typography className={styles.subTitle}>
                {project.description}
            </Typography>
            <Divider/>
            <Typography className={styles.subSubTitle}>
                Participants
            </Typography>
            {
                involvements.involvements?.map(involvement => (
                    <ParticipantDisplay
                        involvement={involvement}
                        key={`involvement_${involvement.id}`}
                    />
                ))
            }
            <Button
                variant={"contained"}
                onClick={handleButtonClicked}
                className={styles.button}
            >
                Add participant
            </Button>
            <AddParticipantDialog
                usernames={getUsernamesNotInProject(usernames, involvements)}
                involvementRequest={involvementsRequest}
                setInvolvementRequest={setInvolvementsRequest}
                open={open}
                setOpen={setOpen}
                handleConfirm={handleConfirm}
            />
            <Divider/>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography className={styles.subSubTitle}>
                    Issues
                </Typography>
                <Button
                    variant={"contained"}
                    onClick={handleIssueButtonClicked}
                    className={styles.button}
                >
                    Add issue
                </Button>
            </Box>
            {
                issues.issues && issues.issues.length > 0 ? issues.issues.map((issue, index) => (
                    <IssueDisplay issue={issue} key={`issue_${index}`}/>
                ))
                    :
                    <Typography sx={{color: "gray"}}>
                        There are no issues to display
                    </Typography>
            }
        </Box>
    )

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: (involvements.involvements && issues.issues) ? "100%" : "100vh"}}
        />
    )
};

export default ViewSingleProjectPage;
