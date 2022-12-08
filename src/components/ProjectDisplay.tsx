import {FC} from "react";
import {InvolvementResponse} from "../apis/bugsbyApi";
import {Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";
import {formatString} from "../utils";

interface Props {
    involvement: InvolvementResponse;
}

const ProjectDisplay: FC<Props> = ({involvement}) => {
    const stylesTypography = {
        margin: "10px",
        color: "#112d4e",
        fontWeight: "400"
    };

    return (
        <Link
            to={`/projects/${involvement.project?.id}`}
            className={styles.link}
        >
            <Grid
                container
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid rgb(155, 154, 154)",
                }}
            >
                <Grid item xs={6}>
                    <Typography sx={{...stylesTypography, fontWeight: "600"}} className={styles.subTitle}>
                        {involvement.project?.title}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap align={"right"} sx={stylesTypography} className={styles.subTitle}>
                        {formatString(involvement.role)}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={stylesTypography}>
                        {involvement.project?.description}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    )
};

export default ProjectDisplay;
