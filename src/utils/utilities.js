// Ref: ml-sentiment @ https://www.npmjs.com/package/ml-sentiment
import { REGEX, FILTER } from './constants.js'

function getWeek(t) {
  let onejan = new Date(t.getFullYear(),0,1);
  let today = new Date(t.getFullYear(),t.getMonth(),t.getDate());
  let dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.ceil(dayOfYear/7)
}

function wordFreq(freqMap, string) {
  let words = string.replace(REGEX.PUNCTUATION, ' ').replace(REGEX.WHITESPACE, ' ').split(REGEX.SPACESEP);
  words.forEach(function(w) {
    if (FILTER.indexOf(w.toLowerCase()) == -1) {
      if (!freqMap[w.toLowerCase()]) {
        freqMap[w.toLowerCase()] = 0;
      }
      freqMap[w.toLowerCase()] += 1;
    }
  });
  return freqMap;
}

function findLinks(content) {
  let link;
  let count = 0;

  while((link = REGEX.URL.exec(content)) !== null) {
    content = content.replace(link[1], '');
    count += 1
  }

  return [count, content];
}

function findEmoji(content) {
  let emoji;
  let count = 0;

  while((emoji = REGEX.EMOJI.exec(content))) {
    content = content.replace(emoji[1], '');
    count += 1;
  }

  return [count, content];
}

export {
  getWeek,
  wordFreq,
  findLinks,
  findEmoji
}
