import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { mockApiService } from '@aidonic/shared-utils';
import { Distribution } from '@aidonic/shared-types';
import { MainTabParamList } from '../../App';

interface DashboardStats {
  totalDistributions: number;
  totalAmount: number;
  pendingCount: number;
  completedCount: number;
  failedCount: number;
}

type DashboardScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Dashboard'
>;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalDistributions: 0,
    totalAmount: 0,
    pendingCount: 0,
    completedCount: 0,
    failedCount: 0,
  });
  const [recentDistributions, setRecentDistributions] = useState<
    Distribution[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const loadDashboardData = async () => {
    try {
      const response = await mockApiService.getDistributions(1, 10);
      const distributions: Distribution[] = response.data;

      // Calculate stats from distributions
      const totalAmount = distributions.reduce(
        (sum, dist) => sum + dist.amount,
        0,
      );
      const pendingCount = distributions.filter(
        d => d.status === 'pending',
      ).length;
      const completedCount = distributions.filter(
        d => d.status === 'completed',
      ).length;
      const failedCount = distributions.filter(
        d => d.status === 'failed',
      ).length;

      setStats({
        totalDistributions: distributions.length,
        totalAmount,
        pendingCount,
        completedCount,
        failedCount,
      });

      // Get recent distributions (first 5)
      setRecentDistributions(distributions.slice(0, 5));
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'failed':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: string;
    color: string;
    onPress?: () => void;
  }> = ({ title, value, icon, color, onPress }) => (
    <TouchableOpacity
      style={[
        styles.statCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text
          style={[
            styles.statValue,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            styles.statTitle,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          {title}
        </Text>
      </View>
      {onPress && (
        <Icon
          name="chevron-forward"
          size={16}
          color={isDarkMode ? '#8E8E93' : '#666666'}
        />
      )}
    </TouchableOpacity>
  );

  const DistributionCard: React.FC<{ distribution: Distribution }> = ({
    distribution,
  }) => (
    <TouchableOpacity
      style={[
        styles.distributionCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
      onPress={() => navigation.navigate('Distributions')}
    >
      <View style={styles.distributionHeader}>
        <View style={styles.distributionInfo}>
          <Text
            style={[
              styles.distributionName,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {distribution.name}
          </Text>
          <Text style={[styles.distributionAmount, { color: '#007AFF' }]}>
            ${distribution.amount.toLocaleString()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(distribution.status) },
          ]}
        >
          <Text style={styles.statusText}>{distribution.status}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.distributionRecipient,
          { color: isDarkMode ? '#8E8E93' : '#666666' },
        ]}
      >
        {distribution.recipient.name}
      </Text>
      <Text
        style={[
          styles.distributionDate,
          { color: isDarkMode ? '#8E8E93' : '#666666' },
        ]}
      >
        {new Date(distribution.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const QuickActionCard: React.FC<{
    title: string;
    icon: string;
    color: string;
    onPress: () => void;
  }> = ({ title, icon, color, onPress }) => (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
      onPress={onPress}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text
        style={[
          styles.quickActionTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
        <Text
          style={[
            styles.loadingText,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Loading dashboard...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text
            style={[
              styles.welcomeText,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            Welcome back
          </Text>
          <Text
            style={[
              styles.userName,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            John Doe
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Amount"
            value={`$${stats.totalAmount.toLocaleString()}`}
            icon="cash"
            color="#34C759"
            onPress={() => navigation?.navigate('Charts')}
          />

          <StatCard
            title="Distributions"
            value={stats.totalDistributions}
            icon="list"
            color="#007AFF"
            onPress={() => navigation?.navigate('Distributions')}
          />

          <StatCard
            title="Pending"
            value={stats.pendingCount}
            icon="time"
            color="#FF9500"
            onPress={() => navigation?.navigate('Distributions')}
          />

          <StatCard
            title="Completed"
            value={stats.completedCount}
            icon="checkmark-circle"
            color="#AF52DE"
            onPress={() => navigation?.navigate('Distributions')}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              Quick Actions
            </Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              title="New Distribution"
              icon="add-circle"
              color="#007AFF"
              onPress={() =>
                Alert.alert('New Distribution', 'Feature coming soon!')
              }
            />
            <QuickActionCard
              title="View Reports"
              icon="document-text"
              color="#34C759"
              onPress={() => navigation.navigate('Charts')}
            />
            <QuickActionCard
              title="Search"
              icon="search"
              color="#FF9500"
              onPress={() => navigation.navigate('Distributions')}
            />
            <QuickActionCard
              title="Settings"
              icon="settings"
              color="#8E8E93"
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </View>

        {/* Recent Distributions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              Recent Distributions
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Distributions')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentDistributions.map(distribution => (
            <DistributionCard
              key={distribution.id}
              distribution={distribution}
            />
          ))}
        </View>

        {/* Insights */}
        <View
          style={[
            styles.insightsCard,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
          ]}
        >
          <Text
            style={[
              styles.insightsTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            Today's Insights
          </Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <Icon name="trending-up" size={16} color="#34C759" />
              <Text
                style={[
                  styles.insightText,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Distribution volume increased by 15% this week
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Icon name="time" size={16} color="#FF9500" />
              <Text
                style={[
                  styles.insightText,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {stats.pendingCount} distributions awaiting approval
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Icon name="checkmark-circle" size={16} color="#007AFF" />
              <Text
                style={[
                  styles.insightText,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Average processing time: 2.3 days
              </Text>
            </View>
          </View>
        </View>
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
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  distributionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  distributionInfo: {
    flex: 1,
  },
  distributionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  distributionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  distributionRecipient: {
    fontSize: 14,
    marginBottom: 2,
  },
  distributionDate: {
    fontSize: 12,
  },
  insightsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  insightsList: {},
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 100,
  },
});

export default DashboardScreen;
