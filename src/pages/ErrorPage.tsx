import {FC} from "react";
import {Box, Typography} from "@mui/material";
import BugsbyLogo from "../components/BugsbyLogo";
import ErrorIcon from '@mui/icons-material/Error';
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";

const ErrorPage: FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#112d4e",
                height: "100vh"
            }}
        >
            <BugsbyLogo
                logoColor={"white"}
                textColor={"white"}
                css={{marginLeft: "5vw", paddingTop: "1vh"}}
            />
            <Box
                sx={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "5vh",
                }}
            >
                <ErrorIcon
                    htmlColor={"white"}
                    sx={{fontSize: "30vh"}}
                />
                <Typography sx={{color: "white"}}>
                    Oops.. This worked fine when I tested it...
                </Typography>
                <Typography sx={{color: "white"}}>
                    Try&nbsp;
                    <Link
                        to={"/"}
                        className={styles.link}
                        style={{color: "white"}}
                    >
                        logging in&nbsp;
                    </Link>
                    or&nbsp;
                    <Link
                        to={"/create-account"}
                        className={styles.link}
                        style={{color: "white"}}
                    >
                        create an account&nbsp;
                    </Link>
                    if you don't have one already
                </Typography>
            </Box>
        </Box>
    )
}

export default ErrorPage;