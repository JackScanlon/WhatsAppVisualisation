import React from 'react';
import { StackedBarChart, GridlineSeries, StackedBarSeries, Gridline, LinearYAxis, LinearXAxis, LinearYAxisTickSeries, LinearXAxisTickSeries, LinearXAxisTickLabel } from 'reaviz';
import { chroma } from 'chroma-js';

function DivergentFrequencyGraph(props) {
  var words = [ ];
  let ChatData = props.ChatData;
  let comp = {}

  ChatData.users.forEach(function (person) {
    let freq = ChatData.freqMaps.unsorted[person];
    words[person] = { }
    for (let word in freq) {
      let wordCount = freq[word]
      if (!comp[word.toLowerCase()]) {
        comp[word.toLowerCase()] = {};
        comp[word.toLowerCase()][ChatData.users[0]] = 0;
        comp[word.toLowerCase()][ChatData.users[1]] = 0;
      }
      comp[word.toLowerCase()][person] += wordCount;
    }
  });

  Object.keys(comp).forEach(function (i) {
    let v = comp[i];
    words.push([i, v[ChatData.users[0]], v[ChatData.users[1]]]);
  })
  words.sort(function (a, b) {
    return (b[1] + b[2]) - (a[1] + a[2]);
  })
  words = words.slice(0, 20);

  let data = [ ]

  words.forEach(function (obj) {
    let inx = data.length
    data[inx] = {
        key: obj[0]),
        data: [
            {
                key: ChatData.users[0],
                data: -obj[1]
            },
            {
                key: ChatData.users[1],
                data: obj[2]
            }
        ]
    }
  });

  return (
    <StackedBarChart
      width={400}
      height={250}
      data={data}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
      series={
        <StackedBarSeries
          layout="horizontal"
          type="stackedDiverging"
          colorScheme={['#ffb1d3', '#a0a2bd']}
        />
      }
      yAxis={
        <LinearYAxis
          type="category"
          position="center"
          tickSeries={<LinearYAxisTickSeries line={null}/>}
        />
      }
      xAxis={
        <LinearXAxis
          roundDomains={true}
          type="value"
          tickSeries={
            <LinearXAxisTickSeries
              //line={null}
              label={<LinearXAxisTickLabel padding={5}/>}
            />
          }
        />
      }
    />
  );
}

export {
  DivergentFrequencyGraph
}
