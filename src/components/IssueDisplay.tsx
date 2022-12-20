import {IssueResponse, IssueType, Severity} from "../apis/bugsbyApi";
import {FC} from "react";
import {Link} from "react-router-dom";
import styles from "../styles/styles.module.css";
import {Box, Grid, Tooltip, Typography} from "@mui/material";
import {formatString} from "../utils";
import BugReportIcon from "@mui/icons-material/BugReportOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HelpIcon from "@mui/icons-material/Help";
import ClearIcon from "@mui/icons-material/Clear";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
    issue: IssueResponse
}

const getIssueIcon = (issue: IssueResponse) => {
    const getBugColorBySeverity = (severity: Severity | undefined) => {
        switch (severity) {
            case Severity.TRIVIAL:
                return "#00ac46";
            case Severity.MINOR:
                return "#fdc500";
            case Severity.MAJOR:
                return "#fd8c00";
            case Severity.CRITICAL:
                return "#dc0000";
            case Severity.BLOCKER:
                return "#780000";
            default:
                return "#000";
        }
    };

    switch (issue.type) {
        case IssueType.BUG:
            return (
                <BugReportIcon fontSize={"large"} htmlColor={getBugColorBySeverity(issue.severity)}/>
            );
        case IssueType.DOCUMENTATION:
            return (
                <DescriptionIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.DUPLICATE:
            return (
                <ContentCopyIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.ENHANCEMENT:
            return (
                <AddBoxIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.HELP_WANTED:
            return (
                <HelpIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.INVALID:
            return (
                <ClearIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.QUESTION:
            return (
                <DeviceUnknownIcon fontSize={"large"} htmlColor={"black"}/>
            );
        case IssueType.WONT_FIX:
            return (
                <DoNotDisturbIcon fontSize={"large"} htmlColor={"black"}/>
            );
        default:
            return (
                <ErrorIcon fontSize={"large"} htmlColor={"black"}/>
            );
    }
};

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
