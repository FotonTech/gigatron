// @flow
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const { height } = Dimensions.get('window');

const Wrapper = styled.View`
  margin-bottom: ${height === 812 ? 44 : 20};
`;

const LoweriOSAdaption = () => <Wrapper />;

export default LoweriOSAdaption;
