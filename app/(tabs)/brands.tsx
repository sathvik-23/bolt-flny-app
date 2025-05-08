import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {
  Search,
  Filter,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BrandsScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const categories = [
    { name: 'All', icon: '🌟' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Dining', icon: '🍽️' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Technology', icon: '💻' },
    { name: 'Lifestyle', icon: '✨' },
  ];

  const brands = [
    {
      id: 1,
      name: 'Urban Outfitters',
      category: 'Fashion',
      discount: '20% off',
      image:
        'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.5,
      location: 'Manhattan',
    },
    {
      id: 2,
      name: 'SoulCycle',
      category: 'Fitness',
      discount: 'First class free',
      image:
        'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.8,
      location: 'Brooklyn',
    },
    {
      id: 3,
      name: 'Blue Bottle Coffee',
      category: 'Dining',
      discount: 'Buy one, get one free',
      image:
        'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.2,
      location: 'Manhattan',
    },
    {
      id: 4,
      name: 'Apple Store',
      category: 'Technology',
      discount: 'Student discount available',
      image:
        'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.9,
      location: 'Manhattan',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Partner Brands
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Exclusive offers for FLNY members
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.searchContainer}
      >
        <BlurView intensity={80} tint="dark" style={styles.searchBarBlur}>
          <View style={[styles.searchBar, { borderColor: colors.border }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search brands"
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </BlurView>

        <Pressable
          style={[
            styles.filterButton,
            { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          ]}
        >
          <Filter size={20} color={colors.text} />
        </Pressable>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        style={styles.categoriesSection}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(400 + index * 100).springify()}
            >
              <Pressable
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      index === 0 ? colors.primary : 'rgba(255, 255, 255, 0.1)',
                  },
                ]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    { color: index === 0 ? colors.invertedText : colors.text },
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>

      <ScrollView
        style={styles.brandsContainer}
        contentContainerStyle={styles.brandsContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Featured Brands
        </Text>

        {brands.map((brand, index) => (
          <Animated.View
            key={brand.id}
            entering={FadeInDown.delay(500 + index * 100).springify()}
          >
            <Pressable style={[styles.brandCard]}>
              <Image source={{ uri: brand.image }} style={styles.brandImage} />
              <BlurView intensity={80} tint="dark" style={styles.brandOverlay}>
                <View style={styles.brandContent}>
                  <View style={styles.brandHeader}>
                    <View>
                      <Text style={[styles.brandName, { color: colors.text }]}>
                        {brand.name}
                      </Text>
                      <View style={styles.brandDetails}>
                        <View style={styles.brandDetail}>
                          <MapPin size={14} color={colors.textSecondary} />
                          <Text
                            style={[
                              styles.brandDetailText,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {brand.location}
                          </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                          <Star size={14} color="#FFD700" />
                          <Text
                            style={[
                              styles.ratingText,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {brand.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <ChevronRight size={20} color={colors.textSecondary} />
                  </View>
                  <View style={styles.brandFooter}>
                    <Text
                      style={[
                        styles.brandCategory,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {brand.category}
                    </Text>
                    <View
                      style={[
                        styles.discountBadge,
                        { backgroundColor: colors.accentBackground },
                      ]}
                    >
                      <Text
                        style={[styles.discountText, { color: colors.accent }]}
                      >
                        {brand.discount}
                      </Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchBarBlur: {
    flex: 1,
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
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesSection: {
    marginBottom: 16,
  },
  categoriesContainer: {
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
  brandsContainer: {
    flex: 1,
  },
  brandsContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  brandCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    height: 200,
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  brandContent: {
    gap: 12,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  brandDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandDetailText: {
    fontSize: 13,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '500',
  },
  brandFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandCategory: {
    fontSize: 14,
    fontWeight: '500',
  },
  discountBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
