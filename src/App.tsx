import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import {Api, AuthenticationResponse} from "./apis/bugsbyApi";
import BugsbySnackbar, {BugsbySnackbarProps} from "./components/BugsbySnackbar";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
    // todo retrieve from env file
    const api = new Api({baseURL: 'http://localhost:8080'});
    const [snackbarProps, setSnackbarProps] = useState<BugsbySnackbarProps>({
        open: false,
        alertProps: {}
    });
    // todo get authenticationResponse
    const [, setAuthenticationResponse] = useState<AuthenticationResponse>({});

    return (
        <BrowserRouter>
            <div className={"App"}>
                <BugsbySnackbar
                    snackbarProps={snackbarProps}
                    setSnackbarProps={setSnackbarProps}
                />
                <Routes>
                    <Route
                        path={"/"}
                        element={<LoginPage api={api} setSnackbarProps={setSnackbarProps} setAuthenticationResponse={setAuthenticationResponse}/>}
                    />
                    <Route
                        path={"/create-account"}
                        element={<CreateAccountPage api={api} setSnackbarProps={setSnackbarProps}/>}
                    />
                    <Route
                        path={"/error"}
                        element={<ErrorPage/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
