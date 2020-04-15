import React from 'react';
import WordCloud from '../lib/wordcloud.js';

const fontSizeMapper = word => word.value^0.5;
const rotate = word => (~~(Math.random() * 6) - 3) * 30;

function TopicCloudComponent(props) {
  let ChatData = props.ChatData;
  let topics = ChatData.counts.topics;
  let list = []

  Object.keys(topics).forEach(function (i) {
    let v = topics[i];
    list.push({
      text: i,
      value: v
    })
  });

  return (
        <WordCloud
          data={list}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
        />
  );
}

export {
  TopicCloudComponent
}
