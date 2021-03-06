const gr = (Math.sqrt(5) + 1) / 2; // 1/phi

export const gss = (f, a, b, tol = 1e-5) => {
  let c = b - (b - a) / gr;
  let d = a + (b - a) / gr;

  while (Math.abs(c - d) > tol) {
    if (f(c) < f(d)) {
      b = d;
    } else {
      a = c;
    }

    c = b - (b - a) / gr;
    d = a + (b - a) / gr;
  }

  return (b + a) / 2;
};

export const calculateBounds = (n, { min, max }) => {
  const divisor = 2;
  const base = Math.log2(n);
  const depth = Math.floor(base);
  const hunks = divisor ** depth;
  const hunk = (Math.abs(max) + Math.abs(min)) / hunks;
  const position = n - hunks;

  const minBound = (hunk * position + min);
  const maxBound = (hunk * (position + 1) + min);
  return [minBound, maxBound];
};

export const calculateSamplePoint = (func, a, b) => {
  const x = gss(func, a, b);
  return [x, func(x)];
};
