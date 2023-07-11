import {Api, AuthenticationResponse, InvolvementsList} from "../apis/bugsbyApi";
import * as React from "react";
import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";
import BugsbyDrawer from "../components/BugsbyDrawer";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
}

const StatisticsPage: FC<Props> = ({api, authenticationResponse}) => {
    const {username} = useParams();
    const navigate = useNavigate();
    const [involvements, setInvolvements] = useState<InvolvementsList>({});

    useEffect(() => {
            authenticationResponse.jwt && api.involvements.getInvolvementsByUsername({username: username!})
                .then(response => setInvolvements(response.data))
                .catch(error => navigate("/error"));
        }
        ,[api.involvements, username, authenticationResponse.jwt, navigate]);

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
