import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  DashboardContainer as SharedDashboardContainer,
  DashboardContainerState,
} from '@aidonic/shared-containers';
import { MainTabParamList } from '../../App';
import DashboardPresentation from '../presentations/DashboardPresentation';

type DashboardScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Dashboard'
>;

interface DashboardContainerProps {
  navigation: DashboardScreenNavigationProp;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  navigation,
}) => {
  return (
    <SharedDashboardContainer>
      {(containerState: DashboardContainerState) => (
        <DashboardPresentation {...containerState} navigation={navigation} />
      )}
    </SharedDashboardContainer>
  );
};

export default DashboardContainer;
