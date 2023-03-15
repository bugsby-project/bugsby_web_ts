import React, {FC, ReactNode, useState} from "react";
import {Box, Popover, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface Props {
    message: ReactNode;
}

const InformationPopover: FC<Props> = ({message}) => {
    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return (
        <Box>
            <InfoIcon
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup={"true"}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                sx={{
                    pointerEvents: "none"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography
                    sx={{
                        p: 1
                    }}
                >
                    {message}
                </Typography>
            </Popover>
        </Box>
    );
};

export default InformationPopover;
