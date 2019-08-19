const gr = (Math.sqrt(5) + 1) / 2; // 1/phi

export const gss = (f, a, b, tol = 1e-5) => {
  let c = b - (b - a) / gr;
  let d = a + (b - a) / gr;
  console.log('funcs')
  console.log(c,d)
  console.log(f(c),f(d))

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
  return [hunk * position + min, hunk * (position + 1) + min];
};

export const calculateSamplePoint = (func, a, b) => {
  const x = gss(func, a, b);
  console.log("puntos",x, func(x));
  return [x, func(x)];
};
