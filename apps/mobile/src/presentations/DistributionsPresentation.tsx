import React, { useState } from 'react';
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

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

interface DistributionsPresentationProps {
  navigation: DistributionsScreenNavigationProp;
  distributions: any[];
  loading: boolean;
  error: string | null;
  pagination: any;
  filters: any;
  search: any;
  regions: string[];
  statuses: string[];
  setFilters: (filters: any) => void;
  setSearch: (search: any) => void;
  setPage: (page: number) => void;
  refreshDistributions: () => Promise<void>;
}

const DistributionsPresentation: React.FC<DistributionsPresentationProps> = ({
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
}) => {
  const baseStyles = createBaseStyles();
  const [searchQuery, setSearchQuery] = useState(search.query || '');

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSearch({ query: searchQuery.trim() });
    }
  };

  const handleRegionFilter = (region: string) => {
    // If clicking "All" or clicking the same region, clear the filter
    if (region === '' || filters.region === region) {
      setFilters({ ...filters, region: '' });
    } else {
      // Otherwise, set the new region filter
      setFilters({ ...filters, region });
    }
  };

  const handleStatusFilter = (status: string) => {
    // If clicking "All" or clicking the same status, clear the filter
    if (status === '' || filters.status === status) {
      setFilters({ ...filters, status: '' });
    } else {
      // Otherwise, set the new status filter
      setFilters({ ...filters, status });
    }
  };

  const clearAllFilters = () => {
    setFilters({ region: '', status: '' });
    setSearch({ query: '' });
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    if (pagination.page < pagination.totalPages) {
      setPage(pagination.page + 1);
    }
  };

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
      style={baseStyles.container}
      contentContainerStyle={baseStyles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshDistributions} />
      }
    >
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
              onChangeText={setSearchQuery}
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
                backgroundColor: filters.region === '' ? '#007AFF' : '#F0F0F0',
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
                All
              </TextRN>
            </TouchableOpacity>
            {regions
              .filter(region => region && region !== 'All')
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
                      color: filters.region === region ? '#FFFFFF' : '#666666',
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
                backgroundColor: filters.status === '' ? '#007AFF' : '#F0F0F0',
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
                All
              </TextRN>
            </TouchableOpacity>
            {statuses
              .filter(status => status && status !== 'All')
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
                      color: filters.status === status ? '#FFFFFF' : '#666666',
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
              onPress={() =>
                navigation.navigate('DistributionDetail', { distribution })
              }
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
};

export default DistributionsPresentation;
