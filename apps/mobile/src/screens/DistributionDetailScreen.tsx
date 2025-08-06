import React from 'react';
import DistributionDetailContainer from '../containers/DistributionDetailContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';

type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

interface DistributionDetailScreenProps {
  route: {
    params: {
      distribution: any;
    };
  };
  navigation: DistributionDetailScreenNavigationProp;
}

const DistributionDetailScreen: React.FC<DistributionDetailScreenProps> = ({
  route,
  navigation,
}) => {
  return <DistributionDetailContainer navigation={navigation} route={route} />;
};

export default DistributionDetailScreen;
