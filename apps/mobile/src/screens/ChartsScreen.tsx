import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { mockApiService } from '@aidonic/shared-utils';
import { Distribution } from '@aidonic/shared-types';

const { width } = Dimensions.get('window');

interface ChartData {
  labels: string[];
  data: number[];
  colors: string[];
}

interface AnalyticsData {
  totalDistributions: number;
  totalAmount: number;
  averageAmount: number;
  statusBreakdown: {
    pending: number;
    completed: number;
    failed: number;
  };
  monthlyData: ChartData;
  statusData: ChartData;
  trendsData: {
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
}

const ChartsScreen: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    'week' | 'month' | 'year'
  >('month');
  const isDarkMode = useColorScheme() === 'dark';

  const loadAnalytics = async () => {
    try {
      const response = await mockApiService.getDistributions(1, 100);
      const distributions: Distribution[] = response.data;

      // Calculate analytics
      const totalAmount = distributions.reduce(
        (sum, dist) => sum + dist.amount,
        0,
      );
      const averageAmount = totalAmount / distributions.length || 0;

      const statusBreakdown = {
        pending: distributions.filter(d => d.status === 'pending').length,
        completed: distributions.filter(d => d.status === 'completed').length,
        failed: distributions.filter(d => d.status === 'failed').length,
      };

      // Monthly data (demo)
      const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        colors: [
          '#007AFF',
          '#34C759',
          '#FF9500',
          '#FF3B30',
          '#AF52DE',
          '#5856D6',
        ],
      };

      // Status data
      const statusData = {
        labels: ['Pending', 'Completed', 'Failed'],
        data: [
          statusBreakdown.pending,
          statusBreakdown.completed,
          statusBreakdown.failed,
        ],
        colors: ['#FF9500', '#34C759', '#FF3B30'],
      };

      // Trends data (demo)
      const trendsData = {
        thisMonth: totalAmount,
        lastMonth: totalAmount * 0.85,
        growth: 15.2,
      };

      setAnalyticsData({
        totalDistributions: distributions.length,
        totalAmount,
        averageAmount,
        statusBreakdown,
        monthlyData,
        statusData,
        trendsData,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadAnalytics();
  };

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: string;
    color: string;
    subtitle?: string;
    trend?: string;
  }> = ({ title, value, icon, color, subtitle, trend }) => (
    <View
      style={[
        styles.statCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
    >
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon name={icon} size={24} color={color} />
        </View>
        {trend && (
          <View
            style={[
              styles.trendBadge,
              {
                backgroundColor: trend.startsWith('+') ? '#34C759' : '#FF3B30',
              },
            ]}
          >
            <Text style={styles.trendText}>{trend}</Text>
          </View>
        )}
      </View>
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
      {subtitle && (
        <Text
          style={[
            styles.statSubtitle,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const SimpleBarChart: React.FC<{ data: ChartData; title: string }> = ({
    data,
    title,
  }) => (
    <View
      style={[
        styles.chartCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.chartTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' },
        ]}
      >
        {title}
      </Text>
      <View style={styles.chartContainer}>
        {data.labels.map((label, index) => {
          const maxValue = Math.max(...data.data);
          const percentage =
            maxValue > 0 ? (data.data[index] / maxValue) * 100 : 0;

          return (
            <View key={label} style={styles.barItem}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${percentage}%`,
                      backgroundColor: data.colors[index % data.colors.length],
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.barLabel,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {label}
              </Text>
              <Text
                style={[
                  styles.barValue,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                ${(data.data[index] / 1000).toFixed(0)}k
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const PieChart: React.FC<{ data: ChartData; title: string }> = ({
    data,
    title,
  }) => (
    <View
      style={[
        styles.chartCard,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.chartTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' },
        ]}
      >
        {title}
      </Text>
      <View style={styles.pieContainer}>
        <View style={styles.pieLegend}>
          {data.labels.map((label, index) => {
            const total = data.data.reduce((sum, val) => sum + val, 0);
            const percentage = total > 0 ? (data.data[index] / total) * 100 : 0;

            return (
              <View key={label} style={styles.pieItem}>
                <View
                  style={[
                    styles.pieColor,
                    { backgroundColor: data.colors[index] },
                  ]}
                />
                <View style={styles.pieText}>
                  <Text
                    style={[
                      styles.pieLabel,
                      { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    ]}
                  >
                    {label}
                  </Text>
                  <Text
                    style={[
                      styles.pieValue,
                      { color: isDarkMode ? '#8E8E93' : '#666666' },
                    ]}
                  >
                    {percentage.toFixed(1)}% ({data.data[index]})
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        {/* Simple pie chart representation */}
        <View style={styles.pieChart}>
          {data.data.map((value, index) => {
            const total = data.data.reduce((sum, val) => sum + val, 0);
            const percentage = total > 0 ? (value / total) * 100 : 0;

            return (
              <View
                key={index}
                style={[
                  styles.pieSegment,
                  {
                    backgroundColor: data.colors[index],
                    flex: percentage / 100,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );

  const TimeframeSelector: React.FC = () => (
    <View style={styles.timeframeContainer}>
      {(['week', 'month', 'year'] as const).map(timeframe => (
        <TouchableOpacity
          key={timeframe}
          style={[
            styles.timeframeButton,
            selectedTimeframe === timeframe && { backgroundColor: '#007AFF' },
            { borderColor: isDarkMode ? '#38383A' : '#E5E5EA' },
          ]}
          onPress={() => setSelectedTimeframe(timeframe)}
        >
          <Text
            style={[
              styles.timeframeText,
              {
                color:
                  selectedTimeframe === timeframe
                    ? '#FFFFFF'
                    : isDarkMode
                    ? '#FFFFFF'
                    : '#000000',
              },
            ]}
          >
            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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
          Loading analytics...
        </Text>
      </View>
    );
  }

  if (!analyticsData) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
        <Text
          style={[
            styles.errorText,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          No data available
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
        {/* Timeframe Selector */}
        <TimeframeSelector />

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <StatCard
            title="Total Amount"
            value={`$${analyticsData.totalAmount.toLocaleString()}`}
            icon="cash"
            color="#34C759"
            trend="+15.2%"
          />

          <StatCard
            title="Distributions"
            value={analyticsData.totalDistributions.toString()}
            icon="list"
            color="#007AFF"
            subtitle="This month"
          />

          <StatCard
            title="Average Amount"
            value={`$${analyticsData.averageAmount.toLocaleString()}`}
            icon="analytics"
            color="#FF9500"
          />

          <StatCard
            title="Success Rate"
            value={`${(
              (analyticsData.statusBreakdown.completed /
                analyticsData.totalDistributions) *
              100
            ).toFixed(1)}%`}
            icon="checkmark-circle"
            color="#AF52DE"
            trend="+2.1%"
          />
        </View>

        {/* Monthly Trends */}
        <SimpleBarChart
          data={analyticsData.monthlyData}
          title={`${
            selectedTimeframe.charAt(0).toUpperCase() +
            selectedTimeframe.slice(1)
          }ly Distribution Trends`}
        />

        {/* Status Distribution */}
        <PieChart data={analyticsData.statusData} title="Distribution Status" />

        {/* Performance Insights */}
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
            Performance Insights
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
                {analyticsData.statusBreakdown.completed} distributions
                completed successfully
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
                {analyticsData.statusBreakdown.pending} distributions pending
                approval
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Icon name="alert-circle" size={16} color="#FF3B30" />
              <Text
                style={[
                  styles.insightText,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {analyticsData.statusBreakdown.failed} distributions failed
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Icon name="calendar" size={16} color="#007AFF" />
              <Text
                style={[
                  styles.insightText,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                Growth rate: +{analyticsData.trendsData.growth}% this month
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Metrics */}
        <View
          style={[
            styles.additionalMetrics,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            Additional Metrics
          </Text>

          <View style={styles.metricRow}>
            <Text
              style={[
                styles.metricLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Processing Time (Avg)
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              2.3 days
            </Text>
          </View>

          <View style={styles.metricRow}>
            <Text
              style={[
                styles.metricLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Approval Rate
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              94.2%
            </Text>
          </View>

          <View style={styles.metricRow}>
            <Text
              style={[
                styles.metricLabel,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              Peak Distribution Day
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              Friday
            </Text>
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
  timeframeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    height: 80,
    width: '80%',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  pieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieLegend: {
    flex: 1,
  },
  pieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pieColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  pieText: {
    flex: 1,
  },
  pieLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  pieValue: {
    fontSize: 12,
  },
  pieChart: {
    width: 100,
    height: 100,
    borderRadius: 50,
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: 20,
  },
  pieSegment: {
    height: '100%',
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
  additionalMetrics: {
    padding: 20,
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
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.2)',
  },
  metricLabel: {
    fontSize: 14,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 100,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 100,
  },
});

export default ChartsScreen;
