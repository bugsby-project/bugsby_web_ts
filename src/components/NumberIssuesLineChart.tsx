import {PrefilledIssueCreationMonthCountResponse} from "../apis/bugsbyApi";
import {FC} from "react";

interface Props {
    numberIssuesCount: PrefilledIssueCreationMonthCountResponse
}

const NumberIssuesLineChart: FC<Props> = ({numberIssuesCount}) => {
    return (
        <div></div>
    )
};

export default NumberIssuesLineChart;
