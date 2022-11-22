import React, {Dispatch, FC, SetStateAction} from "react";
import {AlertProps, Slide, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert
        elevation={6}
        ref={ref}
        variant={"filled"}
        {...props}
    />
});

export interface BugsbySnackbarProps {
    open: boolean,
    alertProps: AlertProps
}

interface Props {
    snackbarProps: BugsbySnackbarProps,
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const BugsbySnackbar: FC<Props> = ({snackbarProps, setSnackbarProps}) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarProps(prevState => ({...prevState, open: false}));
    }

    return (
        <Snackbar
            open={snackbarProps.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                horizontal: "left",
                vertical: "bottom"
            }}
            TransitionComponent={Slide}
        >
            <Alert
                onClose={handleClose}
                elevation={6}
                severity={snackbarProps.alertProps.severity}
            >
                {snackbarProps.alertProps.action}
            </Alert>
        </Snackbar>
    );
};

export default BugsbySnackbar;