import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {BugReportOutlined} from "@mui/icons-material";
import styles from '../styles/styles.module.css';

interface Props {
    logoColor: string;
    textColor: string;
    css?: object;
}

const BugsbyLogo: FC<Props> = ({logoColor, textColor, css}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                ...css
            }}
        >
            <BugReportOutlined
                htmlColor={logoColor}
                fontSize={"large"}
            />
            <Typography
                color={textColor}
                className={styles.bugsbyLogo}
            >
                Bugsby
            </Typography>
        </Box>
    )
};

export default BugsbyLogo;