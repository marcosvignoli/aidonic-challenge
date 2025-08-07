import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';
import DistributionDetailPresentation from '../presentations/DistributionDetailPresentation';
import { useDistributionDetail } from '@aidonic/shared-hooks';

type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

interface DistributionDetailContainerProps {
  navigation: DistributionDetailScreenNavigationProp;
  route: {
    params: {
      distribution: {
        id: string;
      };
    };
  };
}

const DistributionDetailContainer = ({
  navigation,
  route,
}: DistributionDetailContainerProps) => {
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(route.params.distribution.id);

  return (
    <DistributionDetailPresentation
      navigation={navigation}
      distribution={distribution}
      loading={loading}
      error={error}
      refreshDistribution={refreshDistribution}
    />
  );
};

export default DistributionDetailContainer;
