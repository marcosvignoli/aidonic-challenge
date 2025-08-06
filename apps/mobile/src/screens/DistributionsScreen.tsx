import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  useColorScheme,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { mockApiService } from '@aidonic/shared-utils';
import { Distribution } from '@aidonic/shared-types';
import { DistributionsStackParamList } from '../../App';

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

interface DistributionsScreenProps {
  navigation: DistributionsScreenNavigationProp;
}

const DistributionsScreen: React.FC<DistributionsScreenProps> = ({
  navigation,
}) => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [filteredDistributions, setFilteredDistributions] = useState<
    Distribution[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const loadDistributions = async (
    pageNum: number = 1,
    refresh: boolean = false,
  ) => {
    try {
      const response = await mockApiService.getDistributions(pageNum, 20);
      const newDistributions = response.data;

      if (refresh) {
        setDistributions(newDistributions);
      } else {
        setDistributions(prev => [...prev, ...newDistributions]);
      }

      setHasMore(newDistributions.length === 20);
      setPage(pageNum);
    } catch (error) {
      Alert.alert('Error', 'Failed to load distributions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDistributions();
  }, []);

  useEffect(() => {
    // Filter distributions based on search and status
    let filtered = distributions;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(dist => dist.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        dist =>
          dist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dist.recipient.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          dist.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredDistributions(filtered);
  }, [distributions, searchQuery, statusFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadDistributions(1, true);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadDistributions(page + 1);
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'failed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const renderDistributionItem = ({ item }: { item: Distribution }) => (
    <TouchableOpacity
      style={[
        styles.distributionItem,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
      ]}
      onPress={() =>
        navigation.navigate('DistributionDetail', { distribution: item })
      }
    >
      <View style={styles.distributionHeader}>
        <View style={styles.distributionInfo}>
          <Text
            style={[
              styles.distributionName,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.distributionAmount,
              { color: isDarkMode ? '#007AFF' : '#007AFF' },
            ]}
          >
            ${item.amount.toLocaleString()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Icon name={getStatusIcon(item.status)} size={14} color="#FFFFFF" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.distributionDetails}>
        <View style={styles.detailRow}>
          <Icon
            name="person-outline"
            size={16}
            color={isDarkMode ? '#8E8E93' : '#666666'}
          />
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? '#8E8E93' : '#666666' },
            ]}
          >
            {item.recipient.name}
          </Text>
        </View>

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
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {item.description && (
        <Text
          style={[
            styles.distributionDescription,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      )}

      <View style={styles.arrowContainer}>
        <Icon
          name="chevron-forward"
          size={16}
          color={isDarkMode ? '#8E8E93' : '#666666'}
        />
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (status: string, label: string) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterButton,
        statusFilter === status && { backgroundColor: '#007AFF' },
        { borderColor: isDarkMode ? '#38383A' : '#E5E5EA' },
      ]}
      onPress={() => setStatusFilter(status)}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color:
              statusFilter === status
                ? '#FFFFFF'
                : isDarkMode
                ? '#FFFFFF'
                : '#000000',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading || distributions.length === 0) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text
          style={[
            styles.footerText,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          Loading more...
        </Text>
      </View>
    );
  };

  if (loading && distributions.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
        ]}
      >
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={styles.loadingIndicator}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
      ]}
    >
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Icon
          name="search"
          size={20}
          color={isDarkMode ? '#8E8E93' : '#666666'}
        />
        <TextInput
          style={[
            styles.searchInput,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
          placeholder="Search distributions..."
          placeholderTextColor={isDarkMode ? '#8E8E93' : '#666666'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon
              name="close-circle"
              size={20}
              color={isDarkMode ? '#8E8E93' : '#666666'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          {renderFilterButton('all', 'All')}
          {renderFilterButton('pending', 'Pending')}
          {renderFilterButton('completed', 'Completed')}
          {renderFilterButton('failed', 'Failed')}
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text
          style={[
            styles.resultsText,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          {filteredDistributions.length} distribution
          {filteredDistributions.length !== 1 ? 's' : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </Text>
      </View>

      {/* Distributions List */}
      <FlatList
        data={filteredDistributions}
        renderItem={renderDistributionItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon
              name="search-outline"
              size={48}
              color={isDarkMode ? '#8E8E93' : '#666666'}
            />
            <Text
              style={[
                styles.emptyText,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
            >
              {searchQuery
                ? 'No distributions found'
                : 'No distributions available'}
            </Text>
            {searchQuery && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearButtonText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    paddingVertical: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  distributionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  distributionInfo: {
    flex: 1,
  },
  distributionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  distributionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  distributionDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  distributionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DistributionsScreen;
