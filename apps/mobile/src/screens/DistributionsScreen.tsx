import React from 'react';
import DistributionsContainer from '../containers/DistributionsContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

interface DistributionsScreenProps {
  navigation: DistributionsScreenNavigationProp;
}

const DistributionsScreen: React.FC<DistributionsScreenProps> = ({
  navigation,
}) => {
  return <DistributionsContainer navigation={navigation} />;
};

export default DistributionsScreen;
