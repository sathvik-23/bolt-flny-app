import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {
  Settings,
  Grid2x2 as Grid,
  Bookmark,
  Award,
  MapPin,
  CalendarDays,
  CreditCard as Edit2,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'badges', label: 'Badges', icon: Award },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.placeholder} />
          <Text style={[styles.profileTitle, { color: colors.text }]}>
            Profile
          </Text>
          <Pressable style={styles.settingsButton}>
            <Settings size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.coverImageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
              style={styles.coverImage}
            />
            <Pressable
              style={[
                styles.editCoverButton,
                { backgroundColor: colors.background },
              ]}
            >
              <Edit2 size={16} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
              style={styles.profileImage}
            />
            <Pressable
              style={[
                styles.editProfileButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Edit2 size={16} color={colors.invertedText} />
            </Pressable>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              Alex Johnson
            </Text>
            <Text
              style={[styles.profileUsername, { color: colors.textSecondary }]}
            >
              @alexjohnson
            </Text>

            <View style={styles.locationContainer}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text
                style={[styles.locationText, { color: colors.textSecondary }]}
              >
                New York, NY
              </Text>
            </View>

            <View style={styles.joinedContainer}>
              <CalendarDays size={16} color={colors.textSecondary} />
              <Text
                style={[styles.joinedText, { color: colors.textSecondary }]}
              >
                Joined March 2023
              </Text>
            </View>

            <Text style={[styles.profileBio, { color: colors.text }]}>
              Fashion enthusiast and lifestyle blogger based in NYC. Always
              looking for the next adventure!
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  248
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Posts
                </Text>
              </View>
              <View
                style={[styles.statDivider, { backgroundColor: colors.border }]}
              />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  15.3K
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Followers
                </Text>
              </View>
              <View
                style={[styles.statDivider, { backgroundColor: colors.border }]}
              />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.text }]}>
                  1,120
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Following
                </Text>
              </View>
            </View>

            <Pressable
              style={[
                styles.editProfileButton,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginTop: 16,
                },
              ]}
            >
              <Text style={[styles.editProfileText, { color: colors.text }]}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.tabsContainer, { borderColor: colors.border }]}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && [
                  styles.activeTab,
                  { borderBottomColor: colors.primary },
                ],
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <tab.icon
                size={20}
                color={
                  selectedTab === tab.id ? colors.primary : colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      selectedTab === tab.id
                        ? colors.primary
                        : colors.textSecondary,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {selectedTab === 'posts' && (
          <View style={styles.postsGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={styles.postItem}>
                <Image
                  source={{
                    uri: `https://images.pexels.com/photos/${
                      1000000 + item * 11111
                    }/pexels-photo-${
                      1000000 + item * 11111
                    }.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
                  }}
                  style={styles.postImage}
                />
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'saved' && (
          <View style={styles.emptySavedContainer}>
            <Bookmark size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No saved items yet
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Items you save will appear here
            </Text>
          </View>
        )}

        {selectedTab === 'badges' && (
          <View style={styles.badgesContainer}>
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                style={[
                  styles.badgeItem,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.badgeIconContainer,
                    { backgroundColor: colors.accentBackground },
                  ]}
                >
                  <Award size={32} color={colors.accent} />
                </View>
                <Text style={[styles.badgeName, { color: colors.text }]}>
                  Trendsetter
                </Text>
                <Text
                  style={[
                    styles.badgeDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  Created 10 posts that received 100+ likes
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  placeholder: {
    width: 24,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    marginBottom: 16,
  },
  coverImageContainer: {
    height: 150,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  editProfileButton: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  editProfileText: {
    fontWeight: '500',
    fontSize: 14,
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
  },
  profileUsername: {
    fontSize: 16,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  joinedText: {
    marginLeft: 4,
    fontSize: 14,
  },
  profileBio: {
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabLabel: {
    marginLeft: 4,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  emptySavedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  badgesContainer: {
    padding: 16,
  },
  badgeItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  badgeDescription: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});
