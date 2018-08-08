import { shallow } from "enzyme"
import * as React from 'react';
import Sample from '../index'

it("renders the heading", () => {
  const result = shallow(<Sample />).contains(<p>Sample</p>)
  expect(result).toBeTruthy()
})