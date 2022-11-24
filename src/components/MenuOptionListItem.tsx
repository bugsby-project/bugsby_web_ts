import React, {FC} from "react";
import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import styles from "../styles/styles.module.css";

interface Props {
    icon: React.ReactNode;
    content: string;
    linkPath: string;
}

const MenuOptionListItem: FC<Props> = ({icon, content, linkPath}) => {
    return (
        <Link to={linkPath} className={styles.link}>
            <ListItem key={""} disablePadding sx={{whiteSpace: "normal"}}>
                <ListItemButton>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={content}
                        sx={{color: "white"}}
                    />
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

export default MenuOptionListItem;