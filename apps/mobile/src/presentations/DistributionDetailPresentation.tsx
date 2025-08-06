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
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';

type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

interface DistributionDetailPresentationProps {
  navigation: DistributionDetailScreenNavigationProp;
  distribution: any | null;
  loading: boolean;
  error: string | null;
  refreshDistribution: () => Promise<void>;
}

const DistributionDetailPresentation: React.FC<
  DistributionDetailPresentationProps
> = ({ navigation, distribution, loading, error, refreshDistribution }) => {
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
            onPress={refreshDistribution}
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

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.loadingContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refreshDistribution}
            />
          }
        >
          <View style={styles.loadingContainer}>
            {Array.from({ length: 6 }, (_, i) => (
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
        </ScrollView>
      </View>
    );
  }

  if (!distribution) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
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
            Distribution Not Found
          </Text>
          <Text
            style={[
              styles.emptyMessage,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            The distribution you're looking for doesn't exist
          </Text>
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
        <RefreshControl refreshing={loading} onRefresh={refreshDistribution} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
        >
          {distribution.region} Distribution
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          Distribution ID: {distribution.id}
        </Text>
      </View>

      {/* Distribution Information */}
      <View
        style={[
          styles.infoCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Distribution Information
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Region
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              {distribution.region}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Date
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              {new Date(distribution.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Status
            </Text>
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

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Total Beneficiaries
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              {distribution.beneficiaries}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Aid Type
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              {distribution.aidType}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Delivery Channel
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              {distribution.deliveryChannel}
            </Text>
          </View>
        </View>
      </View>

      {/* Beneficiary List */}
      <View
        style={[
          styles.beneficiaryCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Beneficiary List
        </Text>

        {distribution.beneficiaryList &&
        distribution.beneficiaryList.length > 0 ? (
          <View style={styles.beneficiaryList}>
            {distribution.beneficiaryList.map((beneficiary: any) => (
              <View
                key={beneficiary.id}
                style={[
                  styles.beneficiaryItem,
                  { backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7' },
                ]}
              >
                <View style={styles.beneficiaryAvatar}>
                  <Text
                    style={[
                      styles.beneficiaryInitial,
                      { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {beneficiary.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.beneficiaryInfo}>
                  <Text
                    style={[
                      styles.beneficiaryName,
                      { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {beneficiary.name}
                  </Text>
                  <Text
                    style={[
                      styles.beneficiaryId,
                      { color: isDarkMode ? '#8E8E93' : '#666666' },
                    ]}
                  >
                    ID: {beneficiary.id}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyBeneficiaryContainer}>
            <Icon
              name="people-outline"
              size={48}
              color={isDarkMode ? '#8E8E93' : '#C7C7CC'}
            />
            <Text
              style={[
                styles.emptyBeneficiaryTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              No Beneficiaries Listed
            </Text>
            <Text
              style={[
                styles.emptyBeneficiaryMessage,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              No beneficiary information is available for this distribution
            </Text>
          </View>
        )}
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
  loadingContent: {
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
  loadingLine: {
    height: 16,
    borderRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  beneficiaryCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  beneficiaryList: {
    gap: 12,
  },
  beneficiaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  beneficiaryAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  beneficiaryInitial: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  beneficiaryId: {
    fontSize: 12,
  },
  emptyBeneficiaryContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyBeneficiaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyBeneficiaryMessage: {
    fontSize: 14,
    textAlign: 'center',
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

export default DistributionDetailPresentation;
