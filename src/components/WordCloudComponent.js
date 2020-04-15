import React from 'react';
import WordCloud from '../lib/wordcloud.js';

const fontSizeMapper = word => word.value^0.5;
const rotate = word => 0; //(~~(Math.random() * 6) - 3) * 30;

function WordCloudComponent(props) {
  let words = [];
  let ChatData = props.ChatData;
  let comp = {}
  ChatData.users.forEach(function (person) {
    let freq = ChatData.freqMaps.unsorted[person];
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
  words = words.slice(0, 100);

  let col = [ ];
  let list = [ ];

  // Need better wordcloud module (make own?) as it doesn't display all the elements => thus, colouring doesn't work correctly
  words.forEach(function (obj) {
    col.push(
      (obj[1] >= obj[2]) ? '#ffb1d3' : '#b1d3ff'
    )
    list.push({
      text: obj[0],
      value: obj[1] + obj[2]
    })
  });

  return (
        <WordCloud
          data={list}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          colors={col}
        />
  );
}

export {
  WordCloudComponent
}
