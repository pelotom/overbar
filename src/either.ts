// main type

export interface Either<A, B> {
  match: Match<A, B>;
  map<C>(f: (b: B) => C): Either<A, C>;
  flatMap<C>(f: (b: B) => Either<A, C>): Either<A, C>;
}

// auxiliary types

export interface Match<A, B> {
  <C>(cases: Cases<A, B, C>): C;
}

export interface Cases<A, B, C> {
  caseLeft(a: A): C;
  caseRight(b: B): C;
}

// constructors

export function left<A, B>(a: A): Either<A, B> {
  return mkEither(cases => cases.caseLeft(a));
}

export function right<A, B>(b: B): Either<A, B> {
  return mkEither(cases => cases.caseRight(b));
}

// functions

export function map<A, B, C>(f: (a: B) => C, e: Either<A, B>): Either<A, C> {
  return e.match({
    caseLeft: a => left<A, C>(a),
    caseRight: b => right<A, C>(f(b))
  });
}

export function flatMap<A, B, C>(f: (b: B) => Either<A, C>, e: Either<A, B>): Either<A, C> {
  return e.match({
    caseLeft: a => left<A, C>(a),
    caseRight: b => f(b).match({
      caseLeft: a => left<A, C>(a),
      caseRight: c => right<A, C>(c)
    }),
  });
}

// mkEither adds the "methodical" versions of the above functions

function mkEither<A, B>(match: Match<A, B>): Either<A, B> {
  var e: Either<A, B> = {
    match: match,
    map: f => map(f, e),
    flatMap: f => flatMap(f, e)
  };
  return e;
}