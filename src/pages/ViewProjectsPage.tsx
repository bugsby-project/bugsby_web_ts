import {Dispatch, FC, SetStateAction} from "react";
import BugsbyDrawer from "../components/BugsbyDrawer";
import {Api, AuthenticationResponse} from "../apis/bugsbyApi";
import {BugsbySnackbarProps} from "../components/BugsbySnackbar";

interface Props {
    api: Api<any>;
    authenticationResponse: AuthenticationResponse;
    setSnackbarProps: Dispatch<SetStateAction<BugsbySnackbarProps>>;
}

const ViewProjectsPage: FC<Props> = ({api, authenticationResponse, setSnackbarProps}) => {

    return (
        <BugsbyDrawer
            content={<div>ana</div>}
            authenticationResponse={authenticationResponse}
            />
    )
}

export default ViewProjectsPage;