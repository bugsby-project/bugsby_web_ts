import {InvolvementsList, IssueResponse, IssueType, Severity, SeverityLevel} from "./apis/bugsbyApi";
import BugReportIcon from "@mui/icons-material/BugReportOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HelpIcon from "@mui/icons-material/Help";
import ClearIcon from "@mui/icons-material/Clear";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import ErrorIcon from "@mui/icons-material/Error";

export const formatString = (text: string | undefined) => {
    return text ? text.replaceAll("_", " ") : "";
};

export const getIssueIcon = (issue: IssueResponse) => {
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

export const severityMapping = {
    [SeverityLevel.NON_SEVERE]: [Severity.TRIVIAL, Severity.MINOR],
    [SeverityLevel.SEVERE]: [Severity.BLOCKER, Severity.CRITICAL]
}

export const severitiesMatch = (chosen: Severity | undefined, predicted: SeverityLevel) => {
    return severityMapping[predicted].find(s => s === chosen);
};

export const issueTypesMatch = (chosen: IssueType | undefined, predicted: IssueType) => chosen === predicted;

export const getUserFullName = (involvements: InvolvementsList, username: string | undefined) => {
    if (involvements.involvements && involvements.involvements.length !== 0) {
        return `${involvements.involvements.at(0)!.user!.firstName} ${involvements.involvements.at(0)!.user!.lastName}`
    }
    if (username) {
        return username;
    }
    return '';
};
