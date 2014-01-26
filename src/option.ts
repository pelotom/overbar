// main type

export interface Option<A> {
  match: Match<A>;
  map<B>(f: (x: A) => B): Option<B>;
  flatMap<B>(f: (x: A) => Option<B>): Option<B>;
}

// auxiliary types

export interface Match<A> {
  <B>(cases: Cases<A, B>): B;
}

export interface Cases<A, B> {
  caseNone(): B;
  caseSome(x: A): B;
}

// constructors

export function none<A>(): Option<A> {
  return mkOption(cases => cases.caseNone());
}

export function some<A>(x: A): Option<A> {
  return mkOption(cases => cases.caseSome(x));
}

// functions

export function map<A, B>(f: (x:A) => B, o: Option<A>) {
  return o.match({
    caseNone: () => none(),
    caseSome: x => some(f(x))  
  });
}

export function flatMap<A, B>(f: (x:A) => Option<B>, o: Option<A>) {
  return o.match({
    caseNone: () => none(),
    caseSome: x => f(x).match({
      caseNone: () => none(),
      caseSome: b => some(b)
    })
  });
}

// mkOption adds the "methodical" versions of the above functions

function mkOption<A>(match: Match<A>): Option<A> {
  var o: Option<A> = {
    match: match,
    map: f => map(f, o),
    flatMap: f => flatMap(f, o)
  };
  return o;
}