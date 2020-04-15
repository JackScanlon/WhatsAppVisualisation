import React from 'react';
import { LineChart, LineSeries, Line } from 'reaviz';
import { chroma } from 'chroma-js';

const getDate = (w, y) => {
    let d = (1 + (w - 1) * 7);
    return new Date(y, 0, d);
};

function WeeklyMessageFrequencyGraph(props) {
    let ChatData = props.ChatData;
    const height = 200;
    const width = 550;
    const lineStroke = 4;
    const data = [ ];
    ChatData.users.forEach(function (person) {
        let inx = data.length;
        data[inx] = {
            key: person,
            data: [ ]
        };
        ChatData.dateAnalysis.weekly[person].forEach(function (v, i) {
            let wDate = getDate(v[2], v[1].getYear());
            data[inx].data.push({
                key: wDate,
                data: v[0]
            });
        });
    });

    return (
        <LineChart
        width={width}
        height={height}
        series={
          <LineSeries
            type="grouped"
            line={<Line strokeWidth={lineStroke} />}
            colorScheme={ d => {
                if (d &&
                    d.length &&
                    d[0] &&
                    (d[0].key == ChatData.users[0] || d.key == ChatData.users[0])) {
                    return '#ffb1d3';
                } else {
                    return '#b1d3ff';
                }
            }}
          />
        }
        data={data}
      />
    );
}

export {
    WeeklyMessageFrequencyGraph
}
