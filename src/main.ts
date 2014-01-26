import O = require('./option');
import L = require('./list');

var o = O.some(92).map(x => x + 8);

var o2 = o.flatMap(x => x > 100 ? O.some('hi') : O.none<string>());

var foo = o2.match({
  caseNone: ()  => "it's nothing",
  caseSome: x   => "hey, it's " + x
});

var xs = L.cons(3, L.cons(9, L.cons(4, L.nil<number>())));

var ys = xs.map(n => n * 23);

/* global console */
console.log(ys.toArray());

console.log(foo);