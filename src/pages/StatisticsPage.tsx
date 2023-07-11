import {
    Api,
    AuthenticationResponse,
    InvolvementsList,
    PrefilledIssueExpectedBehaviourCountResponse
} from "../apis/bugsbyApi";
import * as React from "react";
import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";
import BugsbyDrawer from "../components/BugsbyDrawer";
import ProjectStatisticsDisplay from "../components/ProjectStatisticsDisplay";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
}

const StatisticsPage: FC<Props> = ({api, authenticationResponse}) => {
    const {username} = useParams();
    const navigate = useNavigate();
    const [involvements, setInvolvements] = useState<InvolvementsList>({});
    const [expectedBehaviourCounts, setExpectedBehaviourCounts] = useState<Map<number, PrefilledIssueExpectedBehaviourCountResponse>>(new Map());

    useEffect(() => {
            authenticationResponse.jwt && api.involvements.getInvolvementsByUsername({username: username!})
                .then(response => {
                    setInvolvements(response.data);
                    response.data.involvements?.map(i => i.project?.id)
                        .forEach(id => api.prefilledIssues.getPrefilledIssuesCountByExpectedBehaviourWithProject(id!)
                            .then(response => setExpectedBehaviourCounts(new Map().set(id, response.data)))
                            .catch(error => navigate("/error")))
                })
                .catch(error => navigate("/error"));
        }
        , [api.involvements, api.prefilledIssues, username, authenticationResponse.jwt, navigate]);

    const content = (
        <Box
            className={styles.formBox}
        >
            <Box
                sx={{display: "flex", justifyContent: "space-between"}}
            >
                <Typography className={styles.title}>
                    {`Project statistics`}
                </Typography>
            </Box>
            {
                involvements.involvements && involvements.involvements.length > 0 ?
                    involvements.involvements.map((involvement, index) => (
                        <ProjectStatisticsDisplay
                            involvement={involvement}
                            expectedBehaviourCount={expectedBehaviourCounts.get(involvement.project?.id!)!}
                            key={index}
                        />
                    )) :
                    <Typography sx={{color: "gray"}}>
                        There are no projects to display
                    </Typography>
            }
        </Box>
    );

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: involvements.involvements ? "100vh" : "100%"}}
        />
    )
};

export default StatisticsPage;
