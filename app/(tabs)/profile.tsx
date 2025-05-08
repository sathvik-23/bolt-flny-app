import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {
  Settings,
  Grid2x2 as Grid,
  Bookmark,
  Award,
  MapPin,
  CalendarDays,
  Edit2,
  Share2,
} from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.placeholder} />
          <Text style={[styles.profileTitle, { color: colors.text }]}>
            Profile
          </Text>
          <View style={styles.headerButtons}>
            <Pressable style={styles.headerButton}>
              <Share2 size={24} color={colors.text} />
            </Pressable>
            <Pressable style={styles.headerButton}>
              <Settings size={24} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.profileHeader}
        >
          <View style={styles.coverImageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
              style={styles.coverImage}
            />
            <BlurView intensity={80} tint="dark" style={styles.coverOverlay}>
              <Pressable style={[styles.editCoverButton]}>
                <Edit2 size={16} color={colors.text} />
              </Pressable>
            </BlurView>
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

            <View style={styles.profileDetails}>
              <View style={styles.profileDetail}>
                <MapPin size={16} color={colors.textSecondary} />
                <Text
                  style={[styles.detailText, { color: colors.textSecondary }]}
                >
                  New York, NY
                </Text>
              </View>

              <View style={styles.profileDetail}>
                <CalendarDays size={16} color={colors.textSecondary} />
                <Text
                  style={[styles.detailText, { color: colors.textSecondary }]}
                >
                  Joined March 2023
                </Text>
              </View>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginTop: 16,
                },
              ]}
            >
              <Text style={[styles.editProfileText, { color: colors.text }]}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={[styles.tabsContainer]}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && [
                  styles.activeTab,
                  { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
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
        </Animated.View>

        {selectedTab === 'posts' && (
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.postsGrid}
          >
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <Animated.View
                key={item}
                entering={FadeInDown.delay(500 + index * 100).springify()}
                style={styles.postItem}
              >
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
                <BlurView intensity={80} tint="dark" style={styles.postOverlay}>
                  <View style={styles.postStats}>
                    <View style={styles.postStat}>
                      <Text
                        style={[styles.postStatText, { color: colors.text }]}
                      >
                        ❤️ 1.2K
                      </Text>
                    </View>
                    <View style={styles.postStat}>
                      <Text
                        style={[styles.postStatText, { color: colors.text }]}
                      >
                        💬 48
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </Animated.View>
            ))}
          </Animated.View>
        )}

        {selectedTab === 'saved' && (
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.emptySavedContainer}
          >
            <Bookmark size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No saved items yet
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Items you save will appear here
            </Text>
          </Animated.View>
        )}

        {selectedTab === 'badges' && (
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.badgesContainer}
          >
            {[1, 2, 3].map((item, index) => (
              <Animated.View
                key={item}
                entering={FadeInDown.delay(500 + index * 100).springify()}
                style={[styles.badgeItem]}
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
              </Animated.View>
            ))}
          </Animated.View>
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
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    marginBottom: 16,
  },
  coverImageContainer: {
    height: 180,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  editCoverButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  editProfileButton: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
  },
  profileUsername: {
    fontSize: 16,
    marginTop: 2,
    opacity: 0.8,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  profileBio: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 16,
  },
  editProfileText: {
    fontWeight: '600',
    fontSize: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  postItem: {
    width: (SCREEN_WIDTH - 40) / 3,
    height: (SCREEN_WIDTH - 40) / 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptySavedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.8,
  },
  badgesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 16,
  },
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  badgeDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});
