import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import {Api} from "./apis/bugsbyApi";
import BugsbySnackbar, {BugsbySnackbarProps} from "./components/BugsbySnackbar";

function App() {
    // todo retrieve from env file
    const api = new Api({baseURL: 'http://localhost:8080'});
    const [snackbarProps, setSnackbarProps] = useState<BugsbySnackbarProps>({
        open: false,
        alertProps: {}
    });

    return (
        <BrowserRouter>
            <div className={"App"}>
                <BugsbySnackbar snackbarProps={snackbarProps} setSnackbarProps={setSnackbarProps}/>
                <Routes>
                    <Route
                        path={"/create-account"}
                        element={<CreateAccountPage api={api} setSnackbarProps={setSnackbarProps}/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
