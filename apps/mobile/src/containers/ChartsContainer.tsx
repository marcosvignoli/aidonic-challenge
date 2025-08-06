import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  ChartsContainer as SharedChartsContainer,
  ChartsContainerState,
} from '@aidonic/shared-containers';
import { MainTabParamList } from '../../App';
import ChartsPresentation from '../presentations/ChartsPresentation';

type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

interface ChartsContainerProps {
  navigation: ChartsScreenNavigationProp;
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ navigation }) => {
  return (
    <SharedChartsContainer>
      {(containerState: ChartsContainerState) => (
        <ChartsPresentation {...containerState} navigation={navigation} />
      )}
    </SharedChartsContainer>
  );
};

export default ChartsContainer;
