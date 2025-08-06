import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  DistributionsContainer as SharedDistributionsContainer,
  DistributionsContainerState,
} from '@aidonic/shared-containers';
import { DistributionsStackParamList } from '../../App';
import DistributionsPresentation from '../presentations/DistributionsPresentation';

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

interface DistributionsContainerProps {
  navigation: DistributionsScreenNavigationProp;
}

const DistributionsContainer: React.FC<DistributionsContainerProps> = ({
  navigation,
}) => {
  return (
    <SharedDistributionsContainer>
      {(containerState: DistributionsContainerState) => (
        <DistributionsPresentation
          {...containerState}
          navigation={navigation}
        />
      )}
    </SharedDistributionsContainer>
  );
};

export default DistributionsContainer;
