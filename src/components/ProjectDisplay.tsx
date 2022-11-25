import {FC} from "react";
import {InvolvementResponse} from "../apis/bugsbyApi";
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";
import {formatString} from "../utils";

interface Props {
    involvement: InvolvementResponse;
}

const ProjectDisplay: FC<Props> = ({involvement}) => {
    return (
        <Link
            to={`/projects/${involvement.project?.id}`}
            className={styles.link}
        >
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid rgb(155, 154, 154)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        sx={{margin: "1em", fontSize: "3.5vh", fontWeight: "600", color: "#112d4e"}}
                    >
                        {involvement.project?.title}
                    </Typography>
                    <Typography
                        sx={{margin: "1em", fontSize: "3.5vh", fontWeight: "600", color: "#112d4e"}}
                    >
                        {formatString(involvement.role)}
                    </Typography>
                </Box>
                <Typography
                    sx={{margin: "0 1.4em 1em 1.4em", fontSize: "2.5vh", color: "#112d4e"}}
                >
                    {involvement.project?.description}
                </Typography>
            </Box>
        </Link>

    )
};

export default ProjectDisplay;
