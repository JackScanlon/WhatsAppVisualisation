import { AFINN } from './AFINN.js';

export const Sentiment = (opts) => {
  opts = opts || {}
  opts.words = opts.words || {}
  opts.tokenize = opts.tokenize || (el => el.replace(/\W/g, ''))
  opts.lang = opts.lang || 'en'


  const classifyEn = (dict, negate) => (str) =>
    str.toLowerCase()
      .split(' ')
        .map(opts.tokenize)
      .reduce((acc, word) => {
        var score = negate.test(acc.prev) ? -dict[word] : dict[word]
        return {
          sum: acc.sum + (score || 0),
          prev: word
        }
      }, {sum: 0, prev: ''})
      .sum

  if ('en' === opts.lang) {
    return {
      classify: function() {
        var dict = AFINN;
        var negate = new RegExp(/^(not|don't|dont|no|nope)$/)
        return classifyEn(dict, negate)
      }()
    }
  }
}
