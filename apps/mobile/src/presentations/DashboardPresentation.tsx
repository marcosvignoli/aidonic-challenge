import React, { useCallback, memo } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBaseStyles,
  ButtonRN,
  TextRN,
  StatusBadgeRN,
  CardRN,
} from '@aidonic/ui/react-native';
import { MainTabParamList, DistributionsStackParamList } from '../../App';
import { Distribution } from '@aidonic/shared-types';

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<DistributionsStackParamList>
>;

interface DashboardPresentationProps {
  navigation: DashboardScreenNavigationProp;
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DashboardPresentation = memo(
  ({
    navigation,
    distributions,
    loading,
    error,
    refreshData,
  }: DashboardPresentationProps) => {
    const baseStyles = createBaseStyles();

    const handleDistributionPress = useCallback(
      (item: Distribution) => {
        navigation.navigate('Distributions', {
          screen: 'DistributionDetail',
          params: { distribution: item },
        });
      },
      [navigation],
    );

    const renderDistributionItem = useCallback(
      ({ item }: { item: Distribution }) => (
        <TouchableOpacity
          onPress={() => handleDistributionPress(item)}
          style={{ marginBottom: 16 }}
        >
          <CardRN variant="elevated" interactive>
            <View style={baseStyles.cardHeader}>
              <View style={{ flex: 1 }}>
                <TextRN variant="headingSmall">{item.region}</TextRN>
                <TextRN variant="bodySmall">
                  {item.beneficiaries} beneficiaries
                </TextRN>
              </View>
              <StatusBadgeRN status={item.status} />
            </View>

            <View style={baseStyles.cardContent}>
              <View style={baseStyles.listItem}>
                <Icon name="calendar-outline" size={16} color="#666666" />
                <TextRN variant="bodySmall" style={{ marginLeft: 8 }}>
                  {new Date(item.date).toLocaleDateString()}
                </TextRN>
              </View>
              <View style={baseStyles.listItem}>
                <Icon name="cube-outline" size={16} color="#666666" />
                <TextRN variant="bodySmall" style={{ marginLeft: 8 }}>
                  {item.aidType}
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
      ),
      [baseStyles, handleDistributionPress],
    );

    const renderHeader = useCallback(
      () => (
        <View style={{ marginBottom: 24 }}>
          <TextRN variant="headingLarge">Aid Distributions</TextRN>
          <TextRN variant="bodyMedium">
            Monitor and manage your distribution activities
          </TextRN>
        </View>
      ),
      [],
    );

    const renderEmptyState = useCallback(
      () => (
        <View style={baseStyles.emptyContainer}>
          <Icon name="document-outline" size={48} color="#C7C7CC" />
          <TextRN variant="headingMedium">No Distributions</TextRN>
          <TextRN variant="bodyMedium">
            No distributions have been created yet
          </TextRN>
        </View>
      ),
      [baseStyles.emptyContainer],
    );

    const renderLoadingState = useCallback(
      () => (
        <View style={{ marginBottom: 24 }}>
          {Array.from({ length: 3 }, (_, i) => (
            <View key={i} style={baseStyles.loadingCard}>
              <View style={{ gap: 8 }}>
                <View style={baseStyles.loadingLine} />
                <View style={baseStyles.loadingLine} />
                <View style={baseStyles.loadingLine} />
              </View>
            </View>
          ))}
        </View>
      ),
      [baseStyles.loadingCard, baseStyles.loadingLine],
    );

    if (error) {
      return (
        <View style={baseStyles.container}>
          <View style={baseStyles.errorContainer}>
            <Icon name="alert-circle-outline" size={48} color="#000000" />
            <TextRN variant="headingMedium">Error Loading Data</TextRN>
            <TextRN variant="bodyMedium">{error}</TextRN>
            <ButtonRN onPress={refreshData} variant="secondary">
              Retry
            </ButtonRN>
          </View>
        </View>
      );
    }

    if (loading && distributions.length === 0) {
      return (
        <View style={baseStyles.container}>
          {renderHeader()}
          {renderLoadingState()}
        </View>
      );
    }

    return (
      <FlatList
        contentContainerStyle={[baseStyles.content]}
        data={distributions.slice(0, 6)}
        keyExtractor={item => item.id}
        renderItem={renderDistributionItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
        showsVerticalScrollIndicator={false}
      />
    );
  },
);

DashboardPresentation.displayName = 'DashboardPresentation';

export default DashboardPresentation;
