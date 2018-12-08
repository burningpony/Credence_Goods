
const invphi = (Math.sqrt(5) - 1) / 2; // 1/phi
const invphi2 = (3 - Math.sqrt(5)) / 2; // 1/phi^2

// This function is converted from python example of the
// Golden Section search article on wikipedia
// https://en.wikipedia.org/wiki/Golden-section_search
//
// gr = (math.sqrt(5) + 1) / 2

const gr = (Math.sqrt(5) + 1) / 2; // 1/phi

// def gss(f, a, b, tol=1e-5):
//     '''
//     golden section search
//     to find the minimum of f on [a,b]
//     f: a strictly unimodal function on [a,b]

//     example:
//     >>> f = lambda x: (x-2)**2
//     >>> x = gss(f, 1, 5)
//     >>> x
//     2.000009644875678

//     '''
//     c = b - (b - a) / gr
//     d = a + (b - a) / gr
//     while abs(c - d) > tol:
//         if f(c) < f(d):
//             b = d
//         else:
//             a = c

//         # we recompute both c and d here to avoid loss of precision which may lead to incorrect results or infinite loop
//         c = b - (b - a) / gr
//         d = a + (b - a) / gr

//     return (b + a) / 2
const gss = (f, a, b, tol = 1e-5) => {
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
  const hunks = (divisor ** depth);
  const hunk = (Math.abs(max) + Math.abs(min)) / hunks;
  const position = n - hunks;
  return [hunk * position + min, hunk * (position + 1) + min];
};

export const calculateSamplePoint = (func, a, b) => {
  const x = gss(func, a, b);

  return [x, func(x)];
};
