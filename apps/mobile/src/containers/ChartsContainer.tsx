import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';
import ChartsPresentation from '../presentations/ChartsPresentation';
import { useStats } from '@aidonic/shared-hooks';

type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

interface ChartsContainerProps {
  navigation: ChartsScreenNavigationProp;
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ navigation }) => {
  const { chartData, timeSeriesData, loading, error, refreshStats } =
    useStats();

  return (
    <ChartsPresentation
      navigation={navigation}
      chartData={chartData}
      timeSeriesData={timeSeriesData}
      loading={loading}
      error={error}
      refreshStats={refreshStats}
    />
  );
};

export default ChartsContainer;
