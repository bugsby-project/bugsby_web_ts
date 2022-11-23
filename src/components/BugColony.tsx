import {FC} from "react";
import {Box, Grid} from "@mui/material";
import PestControlIcon from '@mui/icons-material/PestControlOutlined';

interface Props {
    color: string;
}

const BugColony: FC<Props> = ({color}) => {
    return (
        <Box>
            <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-50deg)",
                            fontSize: "4.5vw"
                        }}
                    />
                </Grid>
                {/* end of row */}
                <Grid item xs={1}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-20deg)",
                            fontSize: "4.5vw",
                        }}
                    />
                </Grid>
                <Grid item xs={11}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-50deg)",
                            fontSize: "4.5vw",
                            marginTop: "-20px",
                            marginLeft: "10px"
                        }}
                    />
                </Grid>
                {/* end of row */}
                <Grid item xs={1}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-20deg)",
                            fontSize: "4.5vw",
                            marginLeft: "40px"
                        }}
                    />
                </Grid>
                <Grid item xs={11}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-50deg)",
                            fontSize: "4.5vw",
                            marginLeft: "60px",
                            marginTop: "-30px"
                        }}
                    />
                </Grid>
                {/* end of row */}
                <Grid item xs={1}/>
                <Grid item xs={11}>
                    <PestControlIcon
                        htmlColor={color}
                        fontSize={"large"}
                        sx={{
                            transform: "rotate(-40deg)",
                            fontSize: "4.5vw",
                            marginLeft: "50px",
                            marginTop: "-20px"
                        }}
                    />
                </Grid>
                {/* end of row */}
            </Grid>
        </Box>
    )
};

export default BugColony;