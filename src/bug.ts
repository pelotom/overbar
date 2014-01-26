export interface List<A> {
  match<B>(cases: Cases<A, B>): B;
}

export interface Cases<A, B> {
  caseNil(): B;
  caseCons(x: A, xs: List<A>): B;
}

// constructors

export function nil<A>(): List<A> {
  return {
    match: cases => cases.caseNil()
  };
}

export function cons<A>(x: A, xs: List<A>): List<A> {
  return {
    match: cases => cases.caseCons(x, xs)
  };
}

function map<A, B>(f: (x:A) => B, xs: List<A>): List<B> {
  return xs.match({
    caseNil: () => nil<B>(),
    caseCons: (x, xs1) => cons(f(x), map(f, xs1))
  });
}