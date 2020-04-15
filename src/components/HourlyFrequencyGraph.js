import React from 'react';
import { RadialAreaChart, RadialAxis, RadialArea, RadialAreaSeries } from 'reaviz';
import { chroma } from 'chroma-js';


function HourlyFrequencyGraph(props) {
    let ChatData = props.ChatData;

    const col = ['#ffb1d3', '#b1d3ff']
    const height = 300;
    const width = 300;
    const data = [];

    ChatData.users.forEach(function (person) {
        let inx = data.length;
        data[inx] = {
            key: person,
            data: [ ]
        }
        for (let k in ChatData.dateAnalysis.hourly[person]) {
            let v = ChatData.dateAnalysis.hourly[person][k];
            data[inx].data.push({
                key: k,
                data: v
            })
        }
    });

    return (
    <div>
        <RadialAreaChart
        height={height}
        width={width}
        data={data[0].data}
        axis={<RadialAxis type="category" />}
        area={<RadialArea color={'#ffb1d3'}/>}
        series={<RadialAreaSeries colorScheme={['#ffb1d3']} />}
        />
        <RadialAreaChart
        height={height}
        width={width}
        data={data[1].data}
        axis={<RadialAxis type="category" />}
        area={<RadialArea color={'#b1d3ff'}/>}
        series={<RadialAreaSeries colorScheme={['#b1d3ff']} />}
        />
    </div>
    );
}

export {
    HourlyFrequencyGraph
}
