import React, { useState, useCallback, memo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBaseStyles,
  ButtonRN,
  CardRN,
  TextRN,
  StatusBadgeRN,
} from '@aidonic/ui/react-native';
import { DistributionsStackParamList } from '../../App';
import {
  Distribution,
  FilterOptions,
  SearchOptions,
  PaginationState,
} from '@aidonic/shared-types';

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList' | 'DistributionDetail'
>;

interface DistributionsPresentationProps {
  navigation: DistributionsScreenNavigationProp;
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  filters: FilterOptions;
  search: SearchOptions;
  regions: string[];
  statuses: string[];
  setFilters: (filters: FilterOptions) => void;
  setSearch: (search: SearchOptions) => void;
  setPage: (page: number) => void;
  refreshDistributions: () => Promise<void>;
}

const DistributionsPresentation = memo(
  ({
    navigation,
    distributions,
    loading,
    error,
    pagination,
    filters,
    search,
    regions,
    statuses,
    setFilters,
    setSearch,
    setPage,
    refreshDistributions,
  }: DistributionsPresentationProps) => {
    const baseStyles = createBaseStyles();
    const [searchQuery, setSearchQuery] = useState(search.query || '');

    const handleSearchSubmit = useCallback(() => {
      setSearch({ query: searchQuery.trim() });
    }, [searchQuery, setSearch]);

    const handleSearchChange = useCallback((text: string) => {
      setSearchQuery(text);
    }, []);

    // Debounced search effect
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setSearch({ query: searchQuery.trim() });
      }, 300); // Reduced debounce time for better responsiveness
      return () => clearTimeout(timeoutId);
    }, [searchQuery, setSearch]);

    const handleRegionFilter = useCallback(
      (region: string) => {
        // If clicking "All" or clicking the same region, clear the filter
        if (region === '' || filters.region === region) {
          setFilters({ ...filters, region: '' });
        } else {
          // Otherwise, set the new region filter
          setFilters({ ...filters, region });
        }
      },
      [filters, setFilters],
    );

    const handleStatusFilter = useCallback(
      (status: string) => {
        // If clicking "All" or clicking the same status, clear the filter
        if (status === '' || filters.status === status) {
          setFilters({ ...filters, status: '' });
        } else {
          // Otherwise, set the new status filter
          setFilters({ ...filters, status });
        }
      },
      [filters, setFilters],
    );

    const clearAllFilters = useCallback(() => {
      setFilters({ region: '', status: '' });
      setSearch({ query: '' });
      setSearchQuery('');
    }, [setFilters, setSearch]);

    const handleLoadMore = useCallback(() => {
      if (pagination.page < pagination.totalPages) {
        setPage(pagination.page + 1);
      }
    }, [pagination.page, pagination.totalPages, setPage]);

    const handleDistributionPress = useCallback(
      (distribution: Distribution) => {
        navigation.navigate('DistributionDetail', { distribution });
      },
      [navigation],
    );

    const hasActiveFilters = filters.region || filters.status || search.query;

    if (error) {
      return (
        <View style={baseStyles.container}>
          <View style={baseStyles.errorContainer}>
            <Icon name="alert-circle-outline" size={48} color="#000000" />
            <Text style={[baseStyles.errorTitle, { color: '#000000' }]}>
              Error Loading Data
            </Text>
            <Text style={[baseStyles.errorMessage, { color: '#666666' }]}>
              {error}
            </Text>
            <ButtonRN onPress={refreshDistributions} variant="secondary">
              Retry
            </ButtonRN>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={[baseStyles.container, { backgroundColor: '#F5F5F5' }]}
        contentContainerStyle={baseStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshDistributions}
          />
        }
      >
        {/* DISTRIBUTIONS LIST VIEW - This should always be shown */}
        {/* Search and Filters */}
        <CardRN>
          {/* Simple Search Bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              gap: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: '#F5F5F5',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <TextInput
                style={{ fontSize: 16, color: '#000000' }}
                placeholder="Search distributions..."
                placeholderTextColor={'#999999'}
                value={searchQuery}
                onChangeText={handleSearchChange}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: searchQuery.trim() ? '#007AFF' : '#E5E5E5',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSearchSubmit}
              disabled={!searchQuery.trim()}
            >
              <Icon
                name="search"
                size={20}
                color={searchQuery.trim() ? '#FFFFFF' : '#999999'}
              />
            </TouchableOpacity>
          </View>

          {/* Region Filters */}
          <View style={{ marginTop: 16 }}>
            <TextRN
              variant="bodyMedium"
              style={{ fontWeight: '600', marginBottom: 8 }}
            >
              Region
            </TextRN>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor:
                    filters.region === '' ? '#007AFF' : '#F0F0F0',
                  marginRight: 8,
                }}
                onPress={() => handleRegionFilter('')}
              >
                <TextRN
                  variant="bodySmall"
                  style={{
                    color: filters.region === '' ? '#FFFFFF' : '#666666',
                    fontWeight: '500',
                  }}
                >
                  All Regions
                </TextRN>
              </TouchableOpacity>
              {regions
                .filter(region => region && region !== '')
                .map(region => (
                  <TouchableOpacity
                    key={region}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor:
                        filters.region === region ? '#007AFF' : '#F0F0F0',
                      marginRight: 8,
                    }}
                    onPress={() => handleRegionFilter(region)}
                  >
                    <TextRN
                      variant="bodySmall"
                      style={{
                        color:
                          filters.region === region ? '#FFFFFF' : '#666666',
                        fontWeight: '500',
                      }}
                    >
                      {region}
                    </TextRN>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Status Filters */}
          <View style={{ marginTop: 16 }}>
            <TextRN
              variant="bodyMedium"
              style={{ fontWeight: '600', marginBottom: 8 }}
            >
              Status
            </TextRN>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor:
                    filters.status === '' ? '#007AFF' : '#F0F0F0',
                  marginRight: 8,
                }}
                onPress={() => handleStatusFilter('')}
              >
                <TextRN
                  variant="bodySmall"
                  style={{
                    color: filters.status === '' ? '#FFFFFF' : '#666666',
                    fontWeight: '500',
                  }}
                >
                  All Statuses
                </TextRN>
              </TouchableOpacity>
              {statuses
                .filter(status => status && status !== '')
                .map(status => (
                  <TouchableOpacity
                    key={status}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor:
                        filters.status === status ? '#007AFF' : '#F0F0F0',
                      marginRight: 8,
                    }}
                    onPress={() => handleStatusFilter(status)}
                  >
                    <TextRN
                      variant="bodySmall"
                      style={{
                        color:
                          filters.status === status ? '#FFFFFF' : '#666666',
                        fontWeight: '500',
                      }}
                    >
                      {status}
                    </TextRN>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <View style={{ marginTop: 16 }}>
              <ButtonRN onPress={clearAllFilters} variant="outline" fullWidth>
                Clear All Filters
              </ButtonRN>
            </View>
          )}
        </CardRN>

        {/* Distributions List */}
        {loading && distributions.length === 0 ? (
          <View style={baseStyles.loadingContainer}>
            {Array.from({ length: 3 }, (_, i) => (
              <CardRN key={i} style={baseStyles.loadingCard}>
                <View style={{ padding: 16 }}>
                  <View style={baseStyles.loadingLine} />
                  <View style={baseStyles.loadingLine} />
                  <View style={baseStyles.loadingLine} />
                </View>
              </CardRN>
            ))}
          </View>
        ) : distributions.length === 0 ? (
          <View style={baseStyles.emptyContainer}>
            <Icon name="document-outline" size={48} color="#C7C7CC" />
            <TextRN variant="headingMedium">No Distributions</TextRN>
            <TextRN variant="bodyMedium">
              No distributions have been created yet
            </TextRN>
          </View>
        ) : (
          <View style={{ marginBottom: 24 }}>
            {distributions.map(distribution => (
              <TouchableOpacity
                key={distribution.id}
                onPress={() => handleDistributionPress(distribution)}
              >
                <CardRN>
                  <View style={baseStyles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <TextRN variant="headingSmall">
                        {distribution.region}
                      </TextRN>
                      <TextRN variant="bodySmall">
                        {distribution.beneficiaries} beneficiaries
                      </TextRN>
                    </View>
                    <StatusBadgeRN status={distribution.status} />
                  </View>

                  <View style={baseStyles.cardContent}>
                    <View
                      style={[
                        baseStyles.listItem,
                        {
                          paddingHorizontal: 0,
                          paddingVertical: 4,
                          borderBottomWidth: 0,
                        },
                      ]}
                    >
                      <Icon name="calendar-outline" size={16} color="#666666" />
                      <TextRN variant="bodySmall" style={{ marginLeft: 8 }}>
                        {new Date(distribution.date).toLocaleDateString()}
                      </TextRN>
                    </View>
                    <View
                      style={[
                        baseStyles.listItem,
                        {
                          paddingHorizontal: 0,
                          paddingVertical: 4,
                          borderBottomWidth: 0,
                        },
                      ]}
                    >
                      <Icon name="cube-outline" size={16} color="#666666" />
                      <TextRN variant="bodySmall" style={{ marginLeft: 8 }}>
                        {distribution.aidType}
                      </TextRN>
                    </View>
                    <View
                      style={[
                        baseStyles.listItem,
                        {
                          paddingHorizontal: 0,
                          paddingVertical: 4,
                          borderBottomWidth: 0,
                        },
                      ]}
                    >
                      <Icon name="car-outline" size={16} color="#666666" />
                      <TextRN variant="bodySmall" style={{ marginLeft: 8 }}>
                        {distribution.deliveryChannel}
                      </TextRN>
                    </View>
                  </View>

                  <View style={baseStyles.cardFooter}>
                    <TextRN
                      variant="bodyMedium"
                      style={{ fontWeight: '500', color: '#007AFF' }}
                    >
                      View Details
                    </TextRN>
                    <Icon name="chevron-forward" size={16} color="#007AFF" />
                  </View>
                </CardRN>
              </TouchableOpacity>
            ))}

            {/* Load More Button */}
            {pagination.page < pagination.totalPages && (
              <View style={{ marginTop: 16 }}>
                <ButtonRN onPress={handleLoadMore} variant="outline" fullWidth>
                  Load More
                </ButtonRN>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  },
);

DistributionsPresentation.displayName = 'DistributionsPresentation';

export default DistributionsPresentation;
