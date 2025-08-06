import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Share,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Distribution } from '@aidonic/shared-types';

interface DistributionDetailScreenProps {
  route: {
    params: {
      distribution: Distribution;
    };
  };
  navigation: any;
}

const DistributionDetailScreen: React.FC<DistributionDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { distribution } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleAction = (action: string) => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action.toLowerCase()} this distribution?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          style: action === 'Delete' ? 'destructive' : 'default',
          onPress: () => {
            Alert.alert(
              'Success',
              `Distribution ${action.toLowerCase()}ed successfully`,
            );
            if (action === 'Delete') {
              navigation.goBack();
            }
          },
        },
      ],
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Distribution: ${
          distribution.name
        }\nAmount: $${distribution.amount.toLocaleString()}\nRecipient: ${
          distribution.recipient.name
        }\nStatus: ${distribution.status}`,
        title: 'Distribution Details',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleContactRecipient = () => {
    Alert.alert(
      'Contact Recipient',
      `Contact ${distribution.recipient.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Email',
          onPress: () =>
            Linking.openURL(`mailto:${distribution.recipient.email}`),
        },
        {
          text: 'Call',
          onPress: () =>
            Alert.alert('Call', 'Phone feature not available in demo'),
        },
      ],
    );
  };

  const InfoRow: React.FC<{
    icon: string;
    label: string;
    value: string;
    color?: string;
    onPress?: () => void;
  }> = ({ icon, label, value, color, onPress }) => (
    <TouchableOpacity
      style={styles.infoRow}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.infoIcon}>
        <Icon
          name={icon}
          size={20}
          color={color || (isDarkMode ? '#8E8E93' : '#666666')}
        />
      </View>
      <View style={styles.infoContent}>
        <Text
          style={[
            styles.infoLabel,
            { color: isDarkMode ? '#8E8E93' : '#666666' },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.infoValue,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          {value}
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

  const ActionButton: React.FC<{
    title: string;
    icon: string;
    color: string;
    onPress: () => void;
  }> = ({ title, icon, color, onPress }) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Icon name={icon} size={20} color="#FFFFFF" />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
          <Icon
            name="share-outline"
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode]);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' },
      ]}
      contentContainerStyle={styles.content}
    >
      {/* Header Card */}
      <View
        style={[
          styles.headerCard,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <View style={styles.headerTop}>
          <Text
            style={[
              styles.distributionName,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {distribution.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(distribution.status) },
            ]}
          >
            <Icon
              name={getStatusIcon(distribution.status)}
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.statusText}>{distribution.status}</Text>
          </View>
        </View>

        <Text
          style={[styles.amount, { color: isDarkMode ? '#007AFF' : '#007AFF' }]}
        >
          ${distribution.amount.toLocaleString()}
        </Text>

        {distribution.description && (
          <View style={styles.descriptionContainer}>
            <Text
              style={[
                styles.description,
                { color: isDarkMode ? '#8E8E93' : '#666666' },
              ]}
              numberOfLines={isExpanded ? undefined : 3}
            >
              {distribution.description}
            </Text>
            {distribution.description.length > 100 && (
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.expandText}>
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Recipient Information */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Recipient Information
        </Text>

        <InfoRow
          icon="person"
          label="Name"
          value={distribution.recipient.name}
          onPress={handleContactRecipient}
        />

        <InfoRow
          icon="mail"
          label="Email"
          value={distribution.recipient.email}
          onPress={() =>
            Linking.openURL(`mailto:${distribution.recipient.email}`)
          }
        />

        <InfoRow
          icon="location"
          label="Location"
          value="New York, NY" // Demo data
        />
      </View>

      {/* Distribution Details */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Distribution Details
        </Text>

        <InfoRow icon="card" label="ID" value={distribution.id} />

        <InfoRow icon="cash" label="Currency" value={distribution.currency} />

        <InfoRow
          icon="calendar"
          label="Created Date"
          value={new Date(distribution.createdAt).toLocaleDateString()}
        />

        <InfoRow
          icon="time"
          label="Last Updated"
          value={new Date(distribution.updatedAt).toLocaleDateString()}
        />

        <InfoRow
          icon="document-text"
          label="Type"
          value="Bonus Distribution" // Demo data
        />

        <InfoRow
          icon="business"
          label="Department"
          value="Human Resources" // Demo data
        />
      </View>

      {/* Payment Information */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Payment Information
        </Text>

        <InfoRow
          icon="card-outline"
          label="Payment Method"
          value="Bank Transfer" // Demo data
        />

        <InfoRow
          icon="shield-checkmark"
          label="Security"
          value="Encrypted" // Demo data
        />

        <InfoRow
          icon="analytics"
          label="Processing Fee"
          value="$2.50" // Demo data
        />
      </View>

      {/* Actions */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Actions
        </Text>

        <View style={styles.actionsContainer}>
          <ActionButton
            title="Edit"
            icon="create-outline"
            color="#007AFF"
            onPress={() => handleAction('Edit')}
          />

          <ActionButton
            title="Duplicate"
            icon="copy-outline"
            color="#34C759"
            onPress={() => handleAction('Duplicate')}
          />

          <ActionButton
            title="Download"
            icon="download-outline"
            color="#FF9500"
            onPress={() => handleAction('Download')}
          />

          <ActionButton
            title="Delete"
            icon="trash-outline"
            color="#FF3B30"
            onPress={() => handleAction('Delete')}
          />
        </View>
      </View>

      {/* Status Timeline */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Status Timeline
        </Text>

        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View
              style={[styles.timelineDot, { backgroundColor: '#34C759' }]}
            />
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.timelineTitle,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                Distribution Created
              </Text>
              <Text
                style={[
                  styles.timelineDate,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {new Date(distribution.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View
              style={[styles.timelineDot, { backgroundColor: '#007AFF' }]}
            />
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.timelineTitle,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                Approved for Processing
              </Text>
              <Text
                style={[
                  styles.timelineDate,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {new Date(Date.now() - 86400000).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View
              style={[
                styles.timelineDot,
                { backgroundColor: getStatusColor(distribution.status) },
              ]}
            />
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.timelineTitle,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                Status:{' '}
                {distribution.status.charAt(0).toUpperCase() +
                  distribution.status.slice(1)}
              </Text>
              <Text
                style={[
                  styles.timelineDate,
                  { color: isDarkMode ? '#8E8E93' : '#666666' },
                ]}
              >
                {new Date(distribution.updatedAt).toLocaleString()}
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
  headerButton: {
    marginRight: 16,
  },
  headerCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  distributionName: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    marginRight: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  expandText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.2)',
  },
  infoIcon: {
    width: 32,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
  },
});

export default DistributionDetailScreen;
