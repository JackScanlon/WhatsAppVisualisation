import React from 'react';
import { PieArcSeries, PieChart } from 'reaviz';
import { chroma } from 'chroma-js';


function MessageTypeGraph(props) {
    let ChatData = props.ChatData;

    const col = ['#ddb1ff', '#d3ffb1', '#ffddb1']
    const height = 250;
    const width = 350;
    const data = [ ];


    data.push({
        key: 'Voice/Image/Video media',
        data: ChatData.counts.media[props.person]
    });
    data.push({
        key: 'Links',
        data: ChatData.counts.links[props.person]
    });
    data.push({
        key: 'Emojis',
        data: ChatData.counts.emoji[props.person]
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
    MessageTypeGraph
}
