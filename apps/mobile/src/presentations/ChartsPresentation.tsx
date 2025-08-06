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
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

interface ChartsPresentationProps {
  navigation: ChartsScreenNavigationProp;
  chartData: any[];
  timeSeriesData: any[];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

const ChartsPresentation: React.FC<ChartsPresentationProps> = ({
  navigation,
  chartData,
  timeSeriesData,
  loading,
  error,
  refreshStats,
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
            onPress={refreshStats}
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
        <RefreshControl refreshing={loading} onRefresh={refreshStats} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
        >
          Analytics
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          View distribution statistics and trends
        </Text>
      </View>

      {/* Summary Stats */}
      <View
        style={[
          styles.summaryCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Summary Statistics
        </Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            {Array.from({ length: 3 }, (_, i) => (
              <View key={i} style={styles.loadingStat}>
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
            ))}
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                {chartData.reduce((sum, item) => sum + item.count, 0)}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Total Distributions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                {chartData.find(item => item.status === 'Completed')?.count ||
                  0}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                {timeSeriesData.length}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Active Days
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Status Distribution */}
      <View
        style={[
          styles.chartCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Distributions by Status
        </Text>
        {loading ? (
          <View style={styles.loadingChart}>
            {Array.from({ length: 4 }, (_, i) => (
              <View key={i} style={styles.loadingChartItem}>
                <View
                  style={[
                    styles.loadingCircle,
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
            ))}
          </View>
        ) : chartData.length === 0 ? (
          <View style={styles.emptyChart}>
            <Icon
              name="pie-chart-outline"
              size={48}
              color={isDarkMode ? '#8E8E93' : '#C7C7CC'}
            />
            <Text
              style={[
                styles.emptyChartText,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              No data available
            </Text>
          </View>
        ) : (
          <View style={styles.chartContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.chartItem}>
                <View style={styles.chartItemHeader}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusName,
                      { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <View style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartBarFill,
                      {
                        backgroundColor: getStatusColor(item.status),
                        width: `${
                          (item.count /
                            Math.max(...chartData.map(d => d.count))) *
                          100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.chartValue,
                    { color: isDarkMode ? '#8E8E93' : '#666666' },
                  ]}
                >
                  {item.count} distributions
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Time Series */}
      <View
        style={[
          styles.chartCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Distributions Over Time
        </Text>
        {loading ? (
          <View style={styles.loadingChart}>
            {Array.from({ length: 5 }, (_, i) => (
              <View key={i} style={styles.loadingChartItem}>
                <View
                  style={[
                    styles.loadingCircle,
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
            ))}
          </View>
        ) : timeSeriesData.length === 0 ? (
          <View style={styles.emptyChart}>
            <Icon
              name="trending-up-outline"
              size={48}
              color={isDarkMode ? '#8E8E93' : '#C7C7CC'}
            />
            <Text
              style={[
                styles.emptyChartText,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              No data available
            </Text>
          </View>
        ) : (
          <View style={styles.timeSeriesContainer}>
            {timeSeriesData.map((item, index) => (
              <View key={index} style={styles.timeSeriesItem}>
                <Text
                  style={[
                    styles.timeSeriesDate,
                    { color: isDarkMode ? '#8E8E93' : '#666666' },
                  ]}
                >
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <View style={styles.timeSeriesBar}>
                  <View
                    style={[
                      styles.timeSeriesBarFill,
                      {
                        backgroundColor: '#007AFF',
                        height: `${
                          (item.count /
                            Math.max(...timeSeriesData.map(d => d.count))) *
                          60
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.timeSeriesValue,
                    { color: isDarkMode ? '#FFFFFF' : '#000000' },
                  ]}
                >
                  {item.count}
                </Text>
              </View>
            ))}
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
  summaryCard: {
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
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loadingStat: {
    alignItems: 'center',
    gap: 8,
  },
  loadingLine: {
    height: 16,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  chartCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingChart: {
    gap: 12,
  },
  loadingChartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyChart: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyChartText: {
    fontSize: 16,
    marginTop: 8,
  },
  chartContainer: {
    gap: 12,
  },
  chartItem: {
    gap: 8,
  },
  chartItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusName: {
    fontSize: 16,
    fontWeight: '500',
  },
  chartBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartValue: {
    fontSize: 14,
  },
  timeSeriesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingTop: 16,
  },
  timeSeriesItem: {
    alignItems: 'center',
    flex: 1,
  },
  timeSeriesDate: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  timeSeriesBar: {
    width: 20,
    height: 60,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  timeSeriesBarFill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
  },
  timeSeriesValue: {
    fontSize: 12,
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

export default ChartsPresentation;
