// main type

export interface List<A> {
  match: Match<A>;
  toArray(): any[];
  each(f: (x: A) => void): void;
  map<B>(f: (x: A) => B): List<B>;
  flatMap<B>(f: (x: A) => List<B>): List<B>;
  append(xs: List<A>): List<A>;
}

// auxiliary types

export interface Match<A> {
  <B>(cases: Cases<A, B>): B;
}

export interface Cases<A, B> {
  caseNil(): B;
  caseCons(x: A, xs: List<A>): B;
}

// constructors

export function nil<A>(): List<A> {
  return mkList(cases => cases.caseNil());
}

export function cons<A>(x: A, xs: List<A>): List<A> {
  return mkList(cases => cases.caseCons(x, xs));
}

// functions

export function each<A>(f: (x: A) => void, xs: List<A>): void {
  map(f, xs);
}

export function toArray<A>(xs: List<A>): A[] {
  var arr: A[] = [];
  xs.each(x => arr.push(x));
  return arr;
}

export function append<A>(xs: List<A>, ys: List<A>): List<A> {
  return xs.match({
    caseNil: () => ys,
    caseCons: (x, xs1) => cons(x, append(xs1, ys))
  });
}

export function map<A, B>(f: (x:A) => B, xs: List<A>): List<B> {
  return xs.match({
    caseNil: () => nil<B>(),
    caseCons: (x, xs1) => cons(f(x), map(f, xs1))
  });
}

export function flatten<A>(xss: List<List<A>>): List<A> {
  return xss.match({
    caseNil: () => nil<A>(),
    caseCons: (xs, xss2) => xs.append(flatten(xss2))
  })
}

export function flatMap<A, B>(f: (x:A) => List<B>, xs: List<A>): List<B> {
  return flatten(map(f, xs));
}

// mkList adds the "methodical" versions of the above functions

function mkList<A>(match: Match<A>): List<A> {
  var xs: List<A> = {
    match: match,
    toArray: () => toArray(xs),
    each: f => each(f, xs),
    map: f => map(f, xs),
    flatMap: f => flatMap(f, xs),
    append: ys => append(xs, ys)
  };
  return xs;
}