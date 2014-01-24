import Option = require('./option');

console.log(Option.Some(92).map(x => x + 9).match({
  caseNone: () => "it's nothing",
  caseSome: x => "hey, it's " + x
}));
