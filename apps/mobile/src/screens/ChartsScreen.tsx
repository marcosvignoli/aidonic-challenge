import React from 'react';
import ChartsContainer from '../containers/ChartsContainer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

interface ChartsScreenProps {
  navigation: ChartsScreenNavigationProp;
}

const ChartsScreen: React.FC<ChartsScreenProps> = ({ navigation }) => {
  return <ChartsContainer navigation={navigation} />;
};

export default ChartsScreen;
