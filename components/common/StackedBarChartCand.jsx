import { AgChartsReact } from "ag-charts-react";
import { useState } from "react";


const StackedBarChartCand = ({ data, title,label  }) => {
  
    const [options, setOptions] = useState({
        data,
        title: {
            text: title,
        },
      
        series: [
            {
                type: "donut",
                calloutLabelKey: "asset",
                angleKey: label,
                innerRadiusRatio: 0.6,
            },
        ],
    });

    return <AgChartsReact options={options} />;
};

export default StackedBarChartCand;