import { REGEX, MEDIA_TYPE} from './constants.js'
import { getWeek, wordFreq, findLinks, findEmoji} from './utilities.js';
import { Sentiment } from '../lib/sentiment.js';

const sentiment = Sentiment();

export default function handleChat(data_str) {
  let startDate;
  let people = [ ];
  let freqMaps = { };
  let weeklyCounts = { };
  let dayCount = { };
  let hourlyCounts = { };
  let messageCounts = { };
  let firstSenders = { };
  let linkCounts = { };
  let mediaCounts = { };
  let emojiCounts = { };

  let line;
  let lastDate;
  while((line = REGEX.LINE.exec(data_str))) {
    line[1] = line[1].split('/').reverse().join('/');

    if (!lastDate) {
      lastDate = line[1];
    }

    let message = {
      name: line[3].trim(),
      timestamp: new Date(line[1] + ' ' + line[2]),
      text: line[4].trim()
    }

    if (!startDate) {
      startDate = message.timestamp;
    }

    if (!freqMaps[message.name]) {
      freqMaps[message.name] = { };
      messageCounts[message.name] = 0;
      emojiCounts[message.name] = 0;
      mediaCounts[message.name] = 0;
      linkCounts[message.name] = 0;
      firstSenders[message.name] = 0;
      weeklyCounts[message.name] = [];
      hourlyCounts[message.name] = [];

      people.push(message.name);
    }


    if (!hourlyCounts[message.name][message.timestamp.getHours()]) {
      hourlyCounts[message.name][message.timestamp.getHours()] = 0;
    }
    hourlyCounts[message.name][message.timestamp.getHours()] += 1;

    if (!dayCount[line[1]]) {
      dayCount[line[1]] = 0;
    }
    dayCount[line[1]] += 1;

    if (new Date(lastDate) < new Date(line[1]) && message.timestamp.getHours() > 6) {
      firstSenders[message.name] += 1;
      lastDate = line[1];
    }

    if (!weeklyCounts[message.name][weeklyCounts[message.name].length - 1] || weeklyCounts[message.name][weeklyCounts[message.name].length - 1][2] !== getWeek(message.timestamp)) {
      weeklyCounts[message.name].push([0, message.timestamp, getWeek(message.timestamp), [ ]]);
    }
    weeklyCounts[message.name][weeklyCounts[message.name].length - 1][0] += 1;
    weeklyCounts[message.name][weeklyCounts[message.name].length - 1][3].push(sentiment.classify(message.text));

    if (!!message.text) {
      let [lCount, updl] = findLinks(message.text);
      if (lCount > 0) {
        message.text = updl;
        linkCounts[message.name] += 1;
      }

      let [eCount, upde] = findEmoji(message.text);
      if (eCount > 0) {
        message.text = upde;
        emojiCounts[message.name] += 1;
      }

      for (let key in MEDIA_TYPE) {
        let exp = MEDIA_TYPE[key];
        if (message.text.search(exp) != -1) {
          message.text = message.text.replace(exp, '');
          mediaCounts[message.name] += 1;
        }
      }

      freqMaps[message.name] = wordFreq(freqMaps[message.name], message.text);
      messageCounts[message.name] += 1;
    }
  }

  return {
      dateAnalysis: {
          chatStart: firstSenders,
          start: startDate,
          weekly: weeklyCounts,
          daily: dayCount,
          hourly: hourlyCounts
      },
      freqMaps: {
          unsorted: freqMaps
      },
      counts: {
          message: messageCounts,
          media: mediaCounts,
          emoji: emojiCounts,
          links: linkCounts
      },
      users: people
  }
}
