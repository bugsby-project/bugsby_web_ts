import {Api, AuthenticationResponse, InvolvementsList, IssueList, ProjectResponse} from "../apis/bugsbyApi";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {useNavigate, useParams} from "react-router-dom";
import BugsbyDrawer from "../components/BugsbyDrawer";
import styles from "../styles/styles.module.css";
import * as React from "react";
import {Box, Button, Typography} from "@mui/material";
import ParticipantDisplay from "../components/ParticipantDisplay";
import Divider from "@mui/material/Divider";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const ViewSingleProjectPage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<ProjectResponse>({});
    const [involvements, setInvolvements] = useState<InvolvementsList>({});
    const [issues, setIssues] = useState<IssueList>({});

    useEffect(() => {
            authenticationResponse.jwt &&
            api.projects.getProjectById(+id!)
                .then(response => setProject(response.data))
                .then(() => api.projects.getInvolvementsByProjectId(+id!))
                .then(response => setInvolvements(response.data))
                .then(() => api.projects.getIssuesByProjectId(+id!))
                .then(response => setIssues(response.data))
                .catch(error => navigate("/error"));
        }
        , [id, api.projects, authenticationResponse.jwt, navigate])

    const handleButtonClicked = () => {
        // todo open modal
    }

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
                        key={`involvemenet_${involvement.id}`}
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
            <Divider/>
        </Box>
    )

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: (involvements.involvements || issues.issues) ? "100vh" : "100%"}}
        />
    )
};

export default ViewSingleProjectPage;
