import {InvolvementResponse, PrefilledIssueExpectedBehaviourCountResponse} from "../apis/bugsbyApi";
import {FC, useState} from "react";
import styles from "../styles/styles.module.css";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

interface Props {
    involvement: InvolvementResponse;
    expectedBehaviourCount: PrefilledIssueExpectedBehaviourCountResponse;
}

enum ChartType {
    ExpectedBehaviour = 1,
    NumberIssues
}

const ProjectStatisticsDisplay: FC<Props> = ({involvement, expectedBehaviourCount}) => {
    const [chartType, setChartType] = useState<ChartType>();

    const stylesTypography = {
        margin: "10px",
        color: "#112d4e",
        fontWeight: "400"
    };

    return (
        <Grid
            container
            className={styles.borderedContainer}
        >
            <Grid item xs={12}>
                <Typography sx={{...stylesTypography, fontWeight: "600"}} className={styles.subSubTitle}>
                    {involvement.project?.title}
                </Typography>
            </Grid>
            <Accordion sx={{width: "100%"}}>
                <AccordionSummary>
                    <Grid
                        container
                    >
                        <Grid item xs={6}>
                            <BarChartIcon
                                fontSize={"large"}
                                onClick={(e) => {
                                    if (chartType !== ChartType.ExpectedBehaviour && chartType) {
                                        e.stopPropagation();
                                    }
                                    setChartType(ChartType.ExpectedBehaviour)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ShowChartIcon
                                fontSize={"large"}
                                onClick={(e) => {
                                    if (chartType !== ChartType.NumberIssues && chartType) {
                                        e.stopPropagation();
                                    }
                                    setChartType(ChartType.NumberIssues)
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {/* todo add chart depending on chartType */}
                    {chartType}
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}

export default ProjectStatisticsDisplay;
