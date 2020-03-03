import React from 'react';
import { shallow } from 'enzyme';
import BoutItem from './BoutItem';
import { expect } from 'chai';

describe('<BoutItem />', () => {
  it('renders text', () => {
    const wrapper = shallow(
      <BoutItem
        red_corner_name={'Lorem ipsum'}
        blue_corner_name={'Lorem ipsum'}
        result={'Lorem ipsum'}
      />
    );
    expect(wrapper.find('div').text()).to.contain(
      'Lorem ipsum vs. Lorem ipsum - Lorem ipsum'
    );
  });
});
