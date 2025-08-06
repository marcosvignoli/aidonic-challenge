import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, DistributionsStackParamList } from '../../App';
import DashboardPresentation from '../presentations/DashboardPresentation';
import { useDistributions } from '@aidonic/shared-hooks';

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<DistributionsStackParamList>
>;

interface DashboardContainerProps {
  navigation: DashboardScreenNavigationProp;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  navigation,
}) => {
  const { distributions, loading, error, refreshDistributions } =
    useDistributions();

  return (
    <DashboardPresentation
      navigation={navigation}
      distributions={distributions}
      loading={loading}
      error={error}
      refreshData={refreshDistributions}
    />
  );
};

export default DashboardContainer;
