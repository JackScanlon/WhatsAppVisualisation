import stemmer from './stemmer.js';
import stem from './en.js';

const except = stemmer.except;
const among = stemmer.among;

export {
  stem,
  among,
  except
}
