import React from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type DashboardScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Dashboard'
>;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  return <DashboardContainer navigation={navigation} />;
};

export default DashboardScreen;
