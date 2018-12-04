import { calculateBounds } from '../function';

describe('#calculateBounds', () => {
  it('should work', () => {
    expect(calculateBounds(1, { min: 0, max: 10 })).toEqual([0, 10]);
    expect(calculateBounds(2, { min: 0, max: 10 })).toEqual([0, 5]);
    expect(calculateBounds(3, { min: 0, max: 10 })).toEqual([5, 10]);
    expect(calculateBounds(4, { min: 0, max: 10 })).toEqual([0, 2.5]);
    expect(calculateBounds(5, { min: 0, max: 10 })).toEqual([2.5, 5]);
    expect(calculateBounds(6, { min: 0, max: 10 })).toEqual([5, 7.5]);
    expect(calculateBounds(7, { min: 0, max: 10 })).toEqual([7.5, 10]);
  });
});
