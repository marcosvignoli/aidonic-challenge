import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  useColorScheme,
  Share,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { User } from '@aidonic/shared-types';

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  // Mock user data
  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@aidonic.com',
    avatar: undefined,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () =>
          Alert.alert('Logged Out', 'You have been logged out successfully'),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            Alert.alert(
              'Account Deleted',
              'Your account has been scheduled for deletion',
            ),
        },
      ],
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Aidonic - the best distribution management app!',
        title: 'Aidonic App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Email',
          onPress: () => Linking.openURL('mailto:support@aidonic.com'),
        },
        { text: 'Phone', onPress: () => Linking.openURL('tel:+1-555-0123') },
      ],
    );
  };

  const ProfileSection: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <View
      style={[
        styles.section,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  const ProfileRow: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
    color?: string;
  }> = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
    color,
  }) => (
    <TouchableOpacity
      style={styles.profileRow}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileRowLeft}>
        <View
          style={[
            styles.profileIcon,
            { backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7' },
          ]}
        >
          <Icon
            name={icon}
            size={20}
            color={color || (isDarkMode ? '#FFFFFF' : '#000000')}
          />
        </View>
        <View style={styles.profileText}>
          <Text
            style={[
              styles.profileTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.profileSubtitle,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.profileRowRight}>
        {rightComponent}
        {showArrow && onPress && (
          <Icon
            name="chevron-forward"
            size={20}
            color={isDarkMode ? '#8E8E93' : '#666666'}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
      ]}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7' },
          ]}
        >
          <Icon
            name="person"
            size={40}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
        </View>
        <View style={styles.userInfo}>
          <Text
            style={[
              styles.userName,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {user.name}
          </Text>
          <Text
            style={[
              styles.userEmail,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            {user.email}
          </Text>
          <Text
            style={[
              styles.userRole,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            Administrator
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Profile', 'Feature coming soon!')}
        >
          <Icon name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <ProfileSection title="Account">
        <ProfileRow
          icon="person-outline"
          title="Edit Profile"
          subtitle="Update your personal information"
          onPress={() => Alert.alert('Edit Profile', 'Feature coming soon!')}
        />

        <ProfileRow
          icon="shield-checkmark-outline"
          title="Privacy & Security"
          subtitle="Manage your privacy settings"
          onPress={() =>
            Alert.alert('Privacy Settings', 'Feature coming soon!')
          }
        />

        <ProfileRow
          icon="card-outline"
          title="Payment Methods"
          subtitle="Manage payment and billing"
          onPress={() => Alert.alert('Payment Methods', 'Feature coming soon!')}
        />
      </ProfileSection>

      {/* Preferences */}
      <ProfileSection title="Preferences">
        <ProfileRow
          icon="notifications-outline"
          title="Notifications"
          subtitle={notificationsEnabled ? 'Enabled' : 'Disabled'}
          showArrow={false}
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          }
        />

        <ProfileRow
          icon="moon-outline"
          title="Dark Mode"
          subtitle={isDarkMode ? 'Enabled' : 'Disabled'}
          showArrow={false}
          rightComponent={
            <Text
              style={[
                styles.settingValue,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Auto
            </Text>
          }
        />

        <ProfileRow
          icon="finger-print-outline"
          title="Face ID / Touch ID"
          subtitle={biometricEnabled ? 'Enabled' : 'Disabled'}
          showArrow={false}
          rightComponent={
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={biometricEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          }
        />

        <ProfileRow
          icon="language-outline"
          title="Language"
          subtitle="English"
          onPress={() => Alert.alert('Language', 'Feature coming soon!')}
        />
      </ProfileSection>

      {/* Support */}
      <ProfileSection title="Support">
        <ProfileRow
          icon="help-circle-outline"
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => Alert.alert('Help Center', 'Feature coming soon!')}
        />

        <ProfileRow
          icon="mail-outline"
          title="Contact Support"
          subtitle="Get in touch with our team"
          onPress={handleSupport}
        />

        <ProfileRow
          icon="chatbubble-ellipses-outline"
          title="Send Feedback"
          subtitle="Share your thoughts with us"
          onPress={() => Alert.alert('Feedback', 'Feature coming soon!')}
        />

        <ProfileRow
          icon="star-outline"
          title="Rate App"
          subtitle="Rate us on the App Store"
          onPress={() => Alert.alert('Rate App', 'Feature coming soon!')}
        />
      </ProfileSection>

      {/* Share & About */}
      <ProfileSection title="About">
        <ProfileRow
          icon="share-outline"
          title="Share App"
          subtitle="Tell your friends about Aidonic"
          onPress={handleShare}
        />

        <ProfileRow
          icon="document-text-outline"
          title="Terms of Service"
          onPress={() =>
            Alert.alert('Terms of Service', 'Feature coming soon!')
          }
        />

        <ProfileRow
          icon="shield-outline"
          title="Privacy Policy"
          onPress={() => Alert.alert('Privacy Policy', 'Feature coming soon!')}
        />

        <ProfileRow
          icon="information-circle-outline"
          title="About"
          subtitle="Version 1.0.0"
          onPress={() =>
            Alert.alert(
              'About',
              'Aidonic Mobile v1.0.0\n© 2024 Aidonic. All rights reserved.',
            )
          }
        />
      </ProfileSection>

      {/* Danger Zone */}
      <ProfileSection title="Account Actions">
        <ProfileRow
          icon="log-out-outline"
          title="Sign Out"
          onPress={handleLogout}
          color="#FF9500"
        />

        <ProfileRow
          icon="trash-outline"
          title="Delete Account"
          subtitle="Permanently delete your account"
          onPress={handleDeleteAccount}
          color="#FF3B30"
        />
      </ProfileSection>

      {/* App Info */}
      <View
        style={[
          styles.appInfo,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.appInfoText,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          Aidonic Mobile App v1.0.0
        </Text>
        <Text
          style={[
            styles.appInfoText,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          Built with React Native
        </Text>
        <Text
          style={[
            styles.appInfoText,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          © 2024 Aidonic. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
  },
  section: {
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.2)',
  },
  profileRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 14,
  },
  profileRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    marginRight: 8,
  },
  appInfo: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  appInfoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default ProfileScreen;
