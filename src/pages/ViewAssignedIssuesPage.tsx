import {Api, AuthenticationResponse, IssueList} from "../apis/bugsbyApi";
import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BugsbyDrawer from "../components/BugsbyDrawer";
import styles from "../styles/styles.module.css";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import IssueDisplay from "../components/IssueDisplay";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
}

const ViewAssignedIssuesPage: FC<Props> = ({api, authenticationResponse}) => {
    const {username} = useParams();
    const navigate = useNavigate();
    const [issues, setIssues] = useState<IssueList>({});

    useEffect(() => {
        authenticationResponse.jwt && api.issues.getAssignedIssues({
            username: username ? username : ""
        })
            .then(response => setIssues(response.data))
            .catch(error => navigate("/error"))
    }, [authenticationResponse.jwt, username, navigate, api.issues]);

    const content = (
        <Box className={styles.formBox}>
            <Typography className={styles.title}>
                {`${username}'s assigned issues`}
            </Typography>
            {
                issues.issues && issues.issues.length > 0 ?
                    issues.issues.map((issue, index) => (
                        <IssueDisplay issue={issue} key={`issueDisplay_${index}`}/>
                    ))
                    :
                    <Typography sx={{color: "gray"}}>
                        There are no issues to display
                    </Typography>
            }
        </Box>
    );

    // todo change hardcoded value
    const height = issues.issues ?
        (issues.issues.length === 0 ? "100vh" : (issues.issues.length > 5 ? "100%" : "100vh"))
        : "100vh";

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: height}}
        />
    );
};

export default ViewAssignedIssuesPage;
