import React from 'react';
import { CalendarHeatmap, HeatmapSeries } from 'reaviz';
import { chroma } from 'chroma-js';


function DailyFrequencyHeatmap(props) {
    let ChatData = props.ChatData;

    const height = 115;
    const width = 715;
    const data = [];

    for (let d in ChatData.dateAnalysis.daily) {
        let c = ChatData.dateAnalysis.daily[d];
        data.push({
            key: new Date(d),
            data: c
        });
    }

    return (
        <CalendarHeatmap height={height} width={width} data={data} series={
            <HeatmapSeries colorScheme={['#ffeed8', '#ffddb1']} />
        }/>
    );
}

export {
    DailyFrequencyHeatmap
}
