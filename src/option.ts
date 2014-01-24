export interface Option<A> {
  match: Match<A>;
  map<B>(f: (a:A) => B): Option<B>;
  flatMap<B>(f: (a:A) => Option<B>): Option<B>;
}

// constructors

export function None<A>(): Option<A> {
  return mkOption(cases => cases.caseNone());
}

export function Some<A>(a: A): Option<A> {
  return mkOption(cases => cases.caseSome(a));
}

export interface Cases<A, B> {
  caseNone(): B;
  caseSome(a: A): B;
}

export interface Match<A> {
  <B>(cases: Cases<A, B>): B;
}

function mkOption<A>(match: Match<A>): Option<A> {
  function map<B>(f:(A) => B): Option<B> {
    return match({
      caseNone: () => <Option<B>>None(),
      caseSome: a => Some(f(a))  
    });
  }
  var o: Option<A> = {
    match: match,
    map: f => o.match({
      caseNone: () => None(),
      caseSome: a => Some(f(a))  
    }),
    flatMap: f => match({
      caseNone: () => None(),
      caseSome: a => f(a).match({
        caseNone: () => None(),
        caseSome: b => Some(b)
      })
    })
  };
  return o;
}

export function map<A, B>(f: (a:A) => B): (o: Option<A>) => Option<B> {
  return o => o.map(f);
}

export function flatMap<A, B>(f: (a:A) => Option<B>): (o: Option<A>) => Option<B> {
  return o => o.flatMap(f);
}