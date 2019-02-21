import { shallow } from 'enzyme';
import React from 'react';
import Component from '../function_graph';

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      func: 'sin(x)',
      maxY: 2,
      maxX: 2,
      minY: -2,
      minX: -2,
    };
    wrapper = shallow(<Component
      {...props}
    />);
  });
  it('calculates the sin(1)', () => {
    expect(wrapper.instance().func(1)).toBe(0.8414709848078965);
  });
});
