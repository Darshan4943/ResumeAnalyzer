import { AgChartsReact } from "ag-charts-react";
import { useState } from "react";


const StackedBarChart = ({ data, title, }) => {
    const [options, setOptions] = useState({
        data,
        title: {
            text: title,
        },

        series: [
            {
                type: "donut",
                calloutLabelKey: "asset",
                angleKey: "Recruiters",
                innerRadiusRatio: 0.6,
            },
        ],
    });

    return <AgChartsReact options={options} />;
};

export default StackedBarChart;