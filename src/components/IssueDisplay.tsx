import {IssueResponse} from "../apis/bugsbyApi";
import {FC} from "react";
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";
import {Box, Grid, Tooltip, Typography} from "@mui/material";
import {formatString, getIssueIcon} from "../utils";

interface Props {
    issue: IssueResponse
}

const IssueDisplay: FC<Props> = ({issue}) => {
    const stylesTypography = {
        margin: "10px",
        color: "#112d4e",
        fontWeight: "400"
    };

    return (
        <Link
            to={`/issues/${issue.id}`}
            className={styles.link}
        >
            <Grid
                container
                className={styles.borderedContainer}
            >
                <Grid item xs={6}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Tooltip title={formatString(issue.type)} arrow sx={{marginLeft: "5px"}}>
                            {getIssueIcon(issue)}
                        </Tooltip>
                        <Typography sx={{...stylesTypography, fontWeight: "600"}} className={styles.subSubTitle}>
                            {issue.title}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography noWrap align={"right"} sx={stylesTypography} className={styles.subSubTitle}>
                        {formatString(issue.status)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography sx={stylesTypography}>
                        {issue.description}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    )
};

export default IssueDisplay;
