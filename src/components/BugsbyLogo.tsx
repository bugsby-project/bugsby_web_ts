import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {BugReportOutlined} from "@mui/icons-material";
import styles from '../styles/styles.module.css';

interface Props {
    logoColor: string;
    textColor: string;
}

const BugsbyLogo: FC<Props> = ({logoColor, textColor}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
            }}
        >
            <BugReportOutlined
                htmlColor={logoColor}
                fontSize={"large"}
            />
            <Typography
                color={textColor}
                className={styles.title}
            >
                Bugsby
            </Typography>
        </Box>
    )
};

export default BugsbyLogo;