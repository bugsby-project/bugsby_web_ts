import {PrefilledIssueCreationMonthCountResponse} from "../apis/bugsbyApi";
import React, {FC} from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    numberIssuesCount: PrefilledIssueCreationMonthCountResponse
}

const NumberIssuesLineChart: FC<Props> = ({numberIssuesCount}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Number of pipeline failures by month',
            },
        },
    };

    const labels = numberIssuesCount.data?.map(c => c.creationMonth)
        .map(dateString => new Date(dateString!))
        .map(date => `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`)

    const data = {
        labels,
        datasets: [
            {
                data: numberIssuesCount.data ? numberIssuesCount.data.map(c => c.count) : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Line
            data={data}
            options={options}
        />
    )
};

export default NumberIssuesLineChart;
