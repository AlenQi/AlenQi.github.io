let Fibonacci = n => (n > 1 ? Fibonacci(n - 1) + Fibonacci(n - 2) : n);

let Fibonacci_ = (curr, next, n) =>
  Object.is(n, 0) ? curr : Fibonacci_(next, curr + next, n - 1);

let Fibonacci = n => Fibonacci_(0, 1, n);
