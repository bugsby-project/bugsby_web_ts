import * as React from "react";
import {Dispatch, FC, SetStateAction} from "react";
import {IssueList} from "../apis/bugsbyApi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import styles from "../styles/styles.module.css";
import IssueDisplay from "./IssueDisplay";

interface Props {
    possibleDuplicates: IssueList;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void;
}

const DuplicateIssuesDialog: FC<Props> = ({possibleDuplicates, open, setOpen, handleConfirm}) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle className={styles.subTitle}>
                Possible duplicate issues
            </DialogTitle>
            <DialogContent className={styles.formBox}>
                <DialogContentText>
                    We think these issues might be duplicates of what you're trying to add
                </DialogContentText>
                {
                    possibleDuplicates.issues?.map((issue, index) => (
                        <IssueDisplay
                            issue={issue}
                            key={`issue_duplicate_${index}`}
                        />
                    ))
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    className={styles.button}
                    onClick={() => handleConfirm()}
                >
                    Continue to add issue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DuplicateIssuesDialog;
