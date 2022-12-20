import * as React from "react";
import {Dispatch, FC, MouseEventHandler, SetStateAction} from "react";
import {InvolvementsRequest, Role, UsernameList} from "../apis/bugsbyApi";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import styles from "../styles/styles.module.css";

interface Props {
    usernames: UsernameList;
    involvementRequest: InvolvementsRequest;
    setInvolvementRequest: Dispatch<SetStateAction<InvolvementsRequest>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleConfirm: MouseEventHandler<any>
}

const AddParticipantDialog: FC<Props> = ({
                                             usernames,
                                             involvementRequest,
                                             setInvolvementRequest,
                                             open,
                                             setOpen,
                                             handleConfirm
                                         }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle className={styles.subTitle}>
                Add participant
            </DialogTitle>
            <DialogContent className={styles.formBox}>
                <DialogContentText sx={{color: "gray"}}>
                    Please select a user to add to the project
                </DialogContentText>
                <Autocomplete
                    value={null}
                    disablePortal={true}
                    className={styles.textField}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={"Username"}
                        />
                    )}
                    options={usernames.usernames ? usernames.usernames : []}
                    onChange={(event: any, newValue: string | null) =>
                        setInvolvementRequest((prevState) => ({...prevState, username: newValue ? newValue : ""}))}
                />
                {
                    involvementRequest.username ?
                        <Autocomplete
                            disablePortal={true}
                            className={styles.textField}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Role"}
                                />
                            )}
                            options={Object.values(Role)}
                            onChange={(event: any, newValue: string | null) =>
                                setInvolvementRequest((prevState) => ({...prevState, role: newValue as Role}))}
                        />
                        :
                        null
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    className={styles.button}
                    onClick={() => {
                        setOpen(false)
                        setInvolvementRequest((prevState) => ({...prevState, username: undefined}))
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant={"contained"}
                    className={styles.button}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddParticipantDialog;
