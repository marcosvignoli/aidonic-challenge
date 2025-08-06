import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  DistributionDetailContainer as SharedDistributionDetailContainer,
  DistributionDetailContainerState,
} from '@aidonic/shared-containers';
import { DistributionsStackParamList } from '../../App';
import DistributionDetailPresentation from '../presentations/DistributionDetailPresentation';

type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

interface DistributionDetailContainerProps {
  navigation: DistributionDetailScreenNavigationProp;
  route: {
    params: {
      distribution: any;
    };
  };
}

const DistributionDetailContainer: React.FC<
  DistributionDetailContainerProps
> = ({ navigation, route }) => {
  return (
    <SharedDistributionDetailContainer
      distributionId={route.params.distribution.id}
    >
      {(containerState: DistributionDetailContainerState) => (
        <DistributionDetailPresentation
          {...containerState}
          navigation={navigation}
          distribution={route.params.distribution}
        />
      )}
    </SharedDistributionDetailContainer>
  );
};

export default DistributionDetailContainer;
