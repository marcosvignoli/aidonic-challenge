import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  createBaseStyles,
  ButtonRN,
  TextRN,
  StatusBadgeRN,
} from '@aidonic/ui/react-native';
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
  const baseStyles = createBaseStyles();

  if (error) {
    return (
      <View style={baseStyles.container}>
        <View style={baseStyles.errorContainer}>
          <Icon name="alert-circle-outline" size={48} color="#000000" />
          <TextRN variant="headingMedium">Error Loading Data</TextRN>
          <TextRN variant="bodyMedium">{error}</TextRN>
          <ButtonRN title="Retry" onPress={refreshData} variant="secondary" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={baseStyles.container}
      contentContainerStyle={baseStyles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshData} />
      }
    >
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <TextRN variant="headingLarge">Aid Distributions</TextRN>
        <TextRN variant="bodyMedium">
          Monitor and manage your distribution activities
        </TextRN>
      </View>

      {/* Distributions List */}
      {loading && distributions.length === 0 ? (
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
          {distributions.slice(0, 6).map(distribution => (
            <TouchableOpacity
              key={distribution.id}
              onPress={() =>
                navigation.navigate('Distributions', {
                  screen: 'DistributionDetail',
                  params: { distribution },
                })
              }
            >
              <View>
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
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default DashboardPresentation;
