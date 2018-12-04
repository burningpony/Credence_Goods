const minimize = require('minimize-golden-section-1d');

const invphi = (Math.sqrt(5) - 1) / 2; // 1/phi
const invphi2 = (3 - Math.sqrt(5)) / 2; // 1/phi^2
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

const gssrec = (f, a, b, tol, {
  h, c, d, fc, fd,
}) => {
  // Golden section search, recursive.

  // Given a function f with a single local minimum in
  // the interval [a,b], gss returns a subset interval
  // [c,d] that contains the minimum with d-c <= tol.

  // example:
  // const f = x => (x - 2) ** 2;
  // const a = 1;
  // const b = 5;
  // const tol = 1e-5;
  // console.log(gssrec(f, a, b, tol, {}));
  // (1.9999959837979107, 2.0000050911830893)
  [a, b] = [Math.min(a, b), Math.max(a, b)];
  if (h === undefined) { h = b - a; }
  if (h <= tol) { return [a, b]; }
  if (c === undefined) { c = a + invphi2 * h; }
  if (d === undefined) { d = a + invphi * h; }
  if (fc === undefined) { fc = f(c); }
  if (fd === undefined) { fd = f(d); }
  if (fc < fd) {
    return gssrec(f, a, d, tol, {
      h: h * invphi, c: undefined, fc: undefined, d: c, fd: fc,
    });
  }

  return gssrec(f, c, b, tol, {
    h: h * invphi, c: d, fc: fd, d: undefined, fd: undefined,
  });
};


export const calculateBounds = (n, { min, max }) => {
  const divisor = 2;

  if (n === 1) {
    return [min, max];
  }

  // ------------------

  if (n === 2) {
    return [max / divisor * 0, max / divisor * 1];
  }

  if (n === 3) {
    return [max / divisor * 1, max / divisor * 2];
  }

  // ------------------

  if (n === 4) {
    return [max / (divisor * 2) * 0, max / (divisor * 2) * 1];
  }

  if (n === 5) {
    return [max / (divisor * 2) * 1, max / (divisor * 2) * 2];
  }

  if (n === 6) {
    return [max / (divisor * 2) * 2, max / (divisor * 2) * 3];
  }

  if (n === 7) {
    return [max / (divisor * 2) * 3, max / (divisor * 2) * 4];
  }
};

export const calculateSamplePoint = (func, a, b) => {
  const x = gss(func, a, b);

  return [x, func(x)];
};
