const minimize = require('minimize-golden-section-1d');

const invphi = (Math.sqrt(5) - 1) / 2; // 1/phi
const invphi2 = (3 - Math.sqrt(5)) / 2; // 1/phi^2

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

export const calculateSamplePoint = (func, a, b) => {
  const x = minimize(func, { upperBound: a, lowerBound: b });
  return [x, func(x)];
};
