import React from 'react';
import '../enzyme-config';
import { mount } from 'enzyme';
import Four04 from '../Four04/Four04';

describe('Four04', () => {
  let mountedFour04;
  const four04 = () => {
    if (!mountedFour04) {
      mountedFour04 = mount(<Four04 />);
    }
    return mountedFour04;
  };

  beforeEach(() => {
    mountedFour04 = undefined;
  });
  test('a section is always rendered', () => {
    const section = four04().find('section');

    expect(section.length).toBe(1);
  });
});
