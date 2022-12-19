import {InvolvementResponse} from "../apis/bugsbyApi";
import {FC} from "react";
import {Grid, Typography} from "@mui/material";
import styles from "../styles/styles.module.css";
import {formatString} from "../utils";
import {Link} from "react-router-dom";

interface Props {
    involvement: InvolvementResponse
}

const ParticipantDisplay: FC<Props> = ({involvement}) => {
    const stylesTypography = {
        margin: "10px",
        color: "#112d4e",
        fontWeight: "400"
    };

    return (
        <Link
            to={`/${involvement.user?.username}/projects`}
            className={styles.link}
        >
            <Grid
                container
                className={styles.borderedContainer}
            >
                <Grid item xs={6}>
                    <Typography sx={{...stylesTypography, fontWeight: "600"}} className={styles.subSubTitle}>
                        {`${involvement.user?.firstName} ${involvement.user?.lastName}`}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap align={"right"} sx={stylesTypography} className={styles.subSubTitle}>
                        {formatString(involvement.role)}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    )
};

export default ParticipantDisplay;
