import React from 'react';
import { PieArcSeries, PieChart } from 'reaviz';
import { chroma } from 'chroma-js';


function MessageCounter(props) {
    let ChatData = props.ChatData;

    const col = ['#ffb1d3', '#b1d3ff']
    const height = 250;
    const width = 350;
    const data = [];

    ChatData.users.forEach(function (v) {
        data.push({
            key: v,
            data: ChatData.counts.message[v]
        })
    });

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
    MessageCounter
}
