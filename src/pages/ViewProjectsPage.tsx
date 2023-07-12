import * as React from "react";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import BugsbyDrawer from "../components/BugsbyDrawer";
import {Api, AuthenticationResponse, InvolvementsList} from "../apis/bugsbyApi";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";
import {Box, Button, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";
import ProjectDisplay from "../components/ProjectDisplay";
import {useNavigate, useParams} from "react-router-dom";
import {getUserFullName} from "../utils";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const ViewProjectsPage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {
    const {username} = useParams();
    const navigate = useNavigate();
    const [involvements, setInvolvements] = useState<InvolvementsList>({});

    useEffect(() => {
            authenticationResponse.jwt && api.involvements.getInvolvementsByUsername({username: username!})
                .then(response => setInvolvements(response.data))
                .catch(error => navigate("/error"));
        }
        , [api.involvements, setSnackbarProps, username, authenticationResponse.jwt, navigate])

    const handleButtonClicked = () => {
        navigate("/add-project");
    };

    const content = (
        <Box
            className={styles.formBox}
        >
            <Box
                sx={{display: "flex", justifyContent: "space-between"}}
            >
                <Typography className={styles.title}>
                    {`${getUserFullName(involvements, username)}'s projects`}
                </Typography>
                {
                    username === authenticationResponse.user?.username ?
                        <Button
                            variant={"contained"}
                            onClick={handleButtonClicked}
                            className={styles.button}
                        >
                            Add project
                        </Button>
                        :
                        null
                }
            </Box>
            {
                involvements.involvements ? involvements.involvements.map((involvement, index) => (
                        <ProjectDisplay involvement={involvement} key={index}/>
                    ))
                    :
                    <Typography>
                        There are no projects to display
                    </Typography>
            }
        </Box>
    )

    return (
        <BugsbyDrawer
            content={content}
            authenticationResponse={authenticationResponse}
            contentClassName={styles.contentImplicitHeight}
            contentStyle={{height: involvements.involvements ? "100vh" : "100%"}}
        />
    )
}

export default ViewProjectsPage;