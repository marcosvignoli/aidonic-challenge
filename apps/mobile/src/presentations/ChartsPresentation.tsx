import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createBaseStyles, ButtonRN, TextRN } from '@aidonic/ui/react-native';
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
  chartData,
  timeSeriesData,
  loading,
  error,
  refreshStats,
}) => {
  const baseStyles = createBaseStyles();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#059669';
      case 'In Progress':
        return '#D97706';
      case 'Planned':
        return '#2563EB';
      default:
        return '#374151';
    }
  };

  if (error) {
    return (
      <View style={baseStyles.container}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle-outline" size={48} color={'#000000'} />
          <TextRN variant="headingMedium">Error Loading Data</TextRN>
          <TextRN variant="bodyMedium">{error}</TextRN>
          <ButtonRN onPress={refreshStats} variant="secondary">
            Retry
          </ButtonRN>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[baseStyles.container, { backgroundColor: '#F2F2F7' }]}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshStats} />
      }
    >
      {/* Summary Stats */}
      <View style={[styles.summaryCard, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.cardTitle, { color: '#000000' }]}>
          Summary Statistics
        </Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            {Array.from({ length: 3 }, (_, i) => (
              <View key={i} style={styles.loadingStat}>
                <View
                  style={[styles.loadingLine, { backgroundColor: '#E5E5EA' }]}
                />
                <View
                  style={[styles.loadingLine, { backgroundColor: '#E5E5EA' }]}
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
                  { color: '#3B82F6' }, // Blue for Total Distributions
                ]}
              >
                {chartData.reduce((sum, item) => sum + item.count, 0)}
              </Text>
              <Text style={[styles.statLabel, { color: '#666666' }]}>
                Total Distributions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: '#10B981' }, // Green for Completed
                ]}
              >
                {chartData.find(item => item.status === 'Completed')?.count ||
                  0}
              </Text>
              <Text style={[styles.statLabel, { color: '#666666' }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: '#F59E0B' }, // Yellow/Orange for Active Days
                ]}
              >
                {timeSeriesData.length}
              </Text>
              <Text style={[styles.statLabel, { color: '#666666' }]}>
                Active Days
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Status Distribution */}
      <View style={[styles.chartCard, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.cardTitle, { color: '#000000' }]}>
          Distributions by Status
        </Text>
        {loading ? (
          <View style={styles.loadingChart}>
            {Array.from({ length: 4 }, (_, i) => (
              <View key={i} style={styles.loadingChartItem}>
                <View
                  style={[styles.loadingCircle, { backgroundColor: '#E5E5EA' }]}
                />
                <View
                  style={[styles.loadingLine, { backgroundColor: '#E5E5EA' }]}
                />
              </View>
            ))}
          </View>
        ) : chartData.length === 0 ? (
          <View style={styles.emptyChart}>
            <Icon name="pie-chart-outline" size={48} color={'#C7C7CC'} />
            <Text style={[styles.emptyChartText, { color: '#666666' }]}>
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
                  <Text style={[styles.statusName, { color: '#000000' }]}>
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
                <Text style={[styles.chartValue, { color: '#666666' }]}>
                  {item.count} distributions
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Time Series */}
      <View style={[styles.chartCard, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.cardTitle, { color: '#000000' }]}>
          Distributions Over Time
        </Text>
        {loading ? (
          <View style={styles.loadingChart}>
            {Array.from({ length: 5 }, (_, i) => (
              <View key={i} style={styles.loadingChartItem}>
                <View
                  style={[styles.loadingCircle, { backgroundColor: '#E5E5EA' }]}
                />
                <View
                  style={[styles.loadingLine, { backgroundColor: '#E5E5EA' }]}
                />
              </View>
            ))}
          </View>
        ) : timeSeriesData.length === 0 ? (
          <View style={styles.emptyChart}>
            <Icon name="trending-up-outline" size={48} color={'#C7C7CC'} />
            <Text style={[styles.emptyChartText, { color: '#666666' }]}>
              No data available
            </Text>
          </View>
        ) : (
          <View style={styles.timeSeriesContainer}>
            {timeSeriesData.map((item, index) => (
              <View key={index} style={styles.timeSeriesItem}>
                <Text style={[styles.timeSeriesDate, { color: '#666666' }]}>
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
                <Text style={[styles.timeSeriesValue, { color: '#000000' }]}>
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
