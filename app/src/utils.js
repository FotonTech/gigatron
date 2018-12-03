
import React from 'react';
import { Platform } from 'react-native';
import LoweriOSAdaption from './components/LowerIOSAdaption';

export const iosVersion = parseInt(Platform.Version, 10);

export const SafeArea = () => {
  return <LoweriOSAdaption />;
};

export const getInitials = (name: string): string => {
  return name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(namePart => namePart.charAt(0).toUpperCase())
        .join('')
    : '';
};
