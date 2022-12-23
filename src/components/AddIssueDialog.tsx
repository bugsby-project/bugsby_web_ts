import * as React from "react";
import {Dispatch, FC, SetStateAction} from "react";
import {IssueRequest, IssueType, SeverityLevel} from "../apis/bugsbyApi";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import styles from "../styles/styles.module.css";
import {formatString, getIssueIcon, issueTypesMatch, severitiesMatch, severityMapping} from "../utils";

interface Props {
    suggestedSeverity: SeverityLevel;
    suggestedType: IssueType;
    issue: IssueRequest;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void;
}

const getSuggestedSeverityMessage = (suggestedSeverity: SeverityLevel) => {
    const colors = {
        [SeverityLevel.SEVERE]: "#D32F2F",
        [SeverityLevel.NON_SEVERE]: "#526F50"
    };
    const suggested = severityMapping[suggestedSeverity]
        .map(x => x.valueOf())
        .reduce((x, y) => `${x} & ${y}`)

    return (
        <Box>
            This issue is&nbsp;
            <Typography color={colors[suggestedSeverity]} sx={{display: "inline", fontWeight: "bold"}}>
                {formatString(suggestedSeverity.valueOf())}
            </Typography>
            . {suggested} might be best suited.
        </Box>
    )
};

const getSuggestedIssueTypeMessage = (suggestedType: IssueType) => {
    return (
        <Box>
            We think that this issue is&nbsp;
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {getIssueIcon({type: suggestedType})}
                <Typography sx={{display: "inline", fontWeight: "bold"}}>
                    {formatString(suggestedType)}
                </Typography>
            </Box>
        </Box>
    )
}

const AddIssueDialog: FC<Props> = ({suggestedSeverity, suggestedType, issue, open, setOpen, handleConfirm}) => {
    // it is assumed that the dialog needs to be displayed (at least a prediction does not match the selected option)
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle className={styles.subTitle}>
                Add issue
            </DialogTitle>
            <DialogContent className={styles.formBox}>
                {
                    !severitiesMatch(issue.severity, suggestedSeverity) ? getSuggestedSeverityMessage(suggestedSeverity) : null
                }
                {
                    !issueTypesMatch(issue.type, suggestedType) ? getSuggestedIssueTypeMessage(suggestedType) : null
                }
                <DialogContentText sx={{color: "gray"}}>
                    Are you sure that you want to save the issue as it is ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    className={styles.button}
                    onClick={() => setOpen(false)}
                >
                    No
                </Button>
                <Button
                    variant={"contained"}
                    className={styles.button}
                    onClick={() => handleConfirm()}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddIssueDialog;
