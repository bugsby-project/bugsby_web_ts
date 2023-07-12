import {PrefilledIssueExpectedBehaviourCountResponse} from "../apis/bugsbyApi";
import {FC} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

interface Props {
    expectedBehaviourCount: PrefilledIssueExpectedBehaviourCountResponse;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpectedBehaviourBarChart: FC<Props> = ({expectedBehaviourCount}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Number of pipeline failures grouped by reason',
            },
        },
    };

    const labels = expectedBehaviourCount.data ? expectedBehaviourCount.data.map(c => c.expectedBehaviour) : ['No data'];

    const data = {
        labels,
        datasets: [
            {
                data: expectedBehaviourCount.data ? expectedBehaviourCount.data.map(c => c.count) : [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Bar
            options={options}
            data={data}
        />
    )
}

export default ExpectedBehaviourBarChart;
