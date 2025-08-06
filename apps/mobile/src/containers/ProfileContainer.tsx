import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';
import ProfilePresentation from '../presentations/ProfilePresentation';

type ProfileScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Profile'
>;

interface ProfileContainerProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ navigation }) => {
  return <ProfilePresentation navigation={navigation} />;
};

export default ProfileContainer;
