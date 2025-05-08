import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Search, X, MapPin, Clock, Calendar, Users } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const categories = [
    { name: 'Events', icon: '🎉' },
    { name: 'Nightlife', icon: '🌙' },
    { name: 'Dining', icon: '🍽️' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Art', icon: '🎨' },
    { name: 'Fashion', icon: '👗' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        entering={FadeIn.duration(400)}
        style={styles.searchContainer}
      >
        <BlurView intensity={80} tint="dark" style={styles.searchBarBlur}>
          <View style={[styles.searchBar, { borderColor: colors.border }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search events, places, or people"
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <Pressable
                onPress={() => setSearchText('')}
                style={styles.clearButton}
              >
                <X size={18} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.categoriesContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {categories.map((category, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(300 + index * 100).springify()}
              >
                <Pressable
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        index === 0
                          ? colors.primary
                          : 'rgba(255, 255, 255, 0.1)',
                    },
                  ]}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: index === 0 ? colors.invertedText : colors.text,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.trendingSection}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Trending Now
          </Text>
          <View style={styles.trendingGrid}>
            {[1, 2, 3, 4].map((item, index) => (
              <Animated.View
                key={item}
                entering={FadeInDown.delay(500 + index * 100).springify()}
              >
                <Pressable style={[styles.trendingItem]}>
                  <Image
                    source={{
                      uri: `https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
                    }}
                    style={styles.trendingImage}
                  />
                  <BlurView
                    intensity={80}
                    tint="dark"
                    style={styles.trendingOverlay}
                  >
                    <View style={styles.trendingContent}>
                      <Text
                        style={[styles.trendingTitle, { color: colors.text }]}
                      >
                        NYC Jazz Night
                      </Text>
                      <View style={styles.trendingDetails}>
                        <View style={styles.trendingDetail}>
                          <MapPin size={14} color={colors.textSecondary} />
                          <Text
                            style={[
                              styles.trendingSubtitle,
                              { color: colors.textSecondary },
                            ]}
                          >
                            Manhattan
                          </Text>
                        </View>
                        <View style={styles.trendingDetail}>
                          <Clock size={14} color={colors.textSecondary} />
                          <Text
                            style={[
                              styles.trendingSubtitle,
                              { color: colors.textSecondary },
                            ]}
                          >
                            8 PM
                          </Text>
                        </View>
                      </View>
                    </View>
                  </BlurView>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.peopleSection}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            People to Follow
          </Text>
          <View style={styles.peopleList}>
            {[1, 2, 3].map((item, index) => (
              <Animated.View
                key={item}
                entering={FadeInDown.delay(700 + index * 100).springify()}
              >
                <View style={[styles.personItem]}>
                  <View style={styles.personProfile}>
                    <Image
                      source={{
                        uri: `https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
                      }}
                      style={styles.personImage}
                    />
                    <View style={styles.personInfo}>
                      <Text style={[styles.personName, { color: colors.text }]}>
                        Sarah Johnson
                      </Text>
                      <Text
                        style={[
                          styles.personBio,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Fashion Designer • NYC
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    style={[
                      styles.followButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.followButtonText,
                        { color: colors.invertedText },
                      ]}
                    >
                      Follow
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchBarBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    gap: 8,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 15,
  },
  trendingSection: {
    marginBottom: 24,
  },
  trendingGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trendingItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  trendingContent: {
    gap: 8,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  trendingDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  trendingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  peopleSection: {
    marginBottom: 24,
  },
  peopleList: {
    paddingHorizontal: 16,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  personProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  personInfo: {
    marginLeft: 12,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
  },
  personBio: {
    fontSize: 14,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
