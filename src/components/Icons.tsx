import React from 'react';
import type { PropsWithChildren } from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
// import Icon from 'react-native-vector-icons/FontAwesome';

type IconsProps = PropsWithChildren<{
  iconName: string;
}>;

const Icons = ({ iconName }: IconsProps) => {
  switch (iconName) {
    case 'circle':
      return <Icon name="circle" size={38} color="#F7CD2E" />;
      break;
    case 'cross':
      return <Icon name="xmark" size={38} color="#38CC77" iconStyle="solid" />;
      break;
    default:
      return <Icon name="pencil" size={38} color="#0D0D0D" iconStyle="solid" />;
      break;
  }
};

export default Icons;
