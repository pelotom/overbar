export function compose<A, B, C>(g: (y: B) => C, f: (x: A) => B) {
  return (x: A) => g(f(x));
}

export function curry<A, B, C>(f: (x: A, y: B) => C) {
  return (x: A) => (y: B) => f(x, y);
}