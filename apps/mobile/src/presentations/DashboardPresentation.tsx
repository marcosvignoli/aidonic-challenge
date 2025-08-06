import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, DistributionsStackParamList } from '../../App';

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<DistributionsStackParamList>
>;

interface DashboardPresentationProps {
  navigation: DashboardScreenNavigationProp;
  distributions: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DashboardPresentation: React.FC<DashboardPresentationProps> = ({
  navigation,
  distributions,
  loading,
  error,
  refreshData,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'In Progress':
        return '#F59E0B';
      case 'Planned':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return isDarkMode ? '#064E3B' : '#D1FAE5';
      case 'In Progress':
        return isDarkMode ? '#78350F' : '#FEF3C7';
      case 'Planned':
        return isDarkMode ? '#1E3A8A' : '#DBEAFE';
      default:
        return isDarkMode ? '#374151' : '#F3F4F6';
    }
  };

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
        <View style={styles.errorContainer}>
          <Icon
            name="alert-circle-outline"
            size={48}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
          <Text
            style={[
              styles.errorTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            Error Loading Data
          </Text>
          <Text
            style={[
              styles.errorMessage,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            {error}
          </Text>
          <TouchableOpacity
            style={[
              styles.retryButton,
              { backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' },
            ]}
            onPress={refreshData}
          >
            <Text
              style={[
                styles.retryButtonText,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
      ]}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshData} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
        >
          Aid Distributions
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          Monitor and manage your distribution activities
        </Text>
      </View>

      {/* Distributions List */}
      {loading && distributions.length === 0 ? (
        <View style={styles.loadingContainer}>
          {Array.from({ length: 3 }, (_, i) => (
            <View
              key={i}
              style={[
                styles.loadingCard,
                { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
              ]}
            >
              <View style={styles.loadingContent}>
                <View
                  style={[
                    styles.loadingLine,
                    { backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA' },
                  ]}
                />
                <View
                  style={[
                    styles.loadingLine,
                    { backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA' },
                  ]}
                />
                <View
                  style={[
                    styles.loadingLine,
                    { backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA' },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      ) : distributions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon
            name="document-outline"
            size={48}
            color={isDarkMode ? '#8E8E93' : '#C7C7CC'}
          />
          <Text
            style={[
              styles.emptyTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            No Distributions
          </Text>
          <Text
            style={[
              styles.emptyMessage,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            No distributions have been created yet
          </Text>
        </View>
      ) : (
        <View style={styles.distributionsContainer}>
          {distributions.slice(0, 6).map(distribution => (
            <TouchableOpacity
              key={distribution.id}
              style={[
                styles.distributionCard,
                { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
              ]}
              onPress={() =>
                navigation.navigate('Distributions', {
                  screen: 'DistributionDetail',
                  params: { distribution },
                })
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {distribution.region}
                  </Text>
                  <Text
                    style={[
                      styles.cardSubtitle,
                      { color: isDarkMode ? '#8E8E93' : '#666666' },
                    ]}
                  >
                    {distribution.beneficiaries} beneficiaries
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusBackgroundColor(
                        distribution.status,
                      ),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(distribution.status) },
                    ]}
                  >
                    {distribution.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Icon
                    name="calendar-outline"
                    size={16}
                    color={isDarkMode ? '#8E8E93' : '#666666'}
                  />
                  <Text
                    style={[
                      styles.detailText,
                      { color: isDarkMode ? '#8E8E93' : '#666666' },
                    ]}
                  >
                    {new Date(distribution.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon
                    name="cube-outline"
                    size={16}
                    color={isDarkMode ? '#8E8E93' : '#666666'}
                  />
                  <Text
                    style={[
                      styles.detailText,
                      { color: isDarkMode ? '#8E8E93' : '#666666' },
                    ]}
                  >
                    {distribution.aidType}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text
                  style={[
                    styles.viewDetailsText,
                    { color: isDarkMode ? '#007AFF' : '#007AFF' },
                  ]}
                >
                  View Details
                </Text>
                <Icon
                  name="chevron-forward"
                  size={16}
                  color={isDarkMode ? '#007AFF' : '#007AFF'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  loadingContainer: {
    marginBottom: 24,
  },
  loadingCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingContent: {
    gap: 8,
  },
  loadingLine: {
    height: 16,
    borderRadius: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  distributionsContainer: {
    marginBottom: 24,
  },
  distributionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DashboardPresentation;
