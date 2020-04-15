import React from 'react';
import { PieArcSeries, PieChart } from 'reaviz';
import { chroma } from 'chroma-js';


function FirstSenderGraph(props) {
    let ChatData = props.ChatData;

    const col = ['#ffb1d3', '#b1d3ff']
    const height = 250;
    const width = 350;
    const data = [];

    ChatData.users.forEach(function (person) {
        data.push({
            key: person,
            data: ChatData.dateAnalysis.chatStart[person]
        });
    })

    return (
        <PieChart
        width={width}
        height={height}
        data={data}
        series={<PieArcSeries doughnut={true} colorScheme={col} />}
      />
    );
}

export {
    FirstSenderGraph
}
