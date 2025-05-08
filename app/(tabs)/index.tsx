import { useState, useRef } from 'react';
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
  Heart,
  MessageCircle,
  Share2,
  ChevronUp,
  X,
} from 'lucide-react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const fashionCards = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg',
    title: 'Modern Minimalist',
    description: 'Clean lines and neutral tones define this contemporary look',
    recommendations: [
      {
        id: 1,
        image:
          'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
        name: 'White Blazer',
        price: '$129',
      },
      {
        id: 2,
        image:
          'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
        name: 'Beige Pants',
        price: '$89',
      },
    ],
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg',
    title: 'Urban Chic',
    description: 'Street style meets sophistication',
    recommendations: [
      {
        id: 3,
        image:
          'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
        name: 'Leather Jacket',
        price: '$199',
      },
      {
        id: 4,
        image:
          'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
        name: 'Black Jeans',
        price: '$79',
      },
    ],
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const expandProgress = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      translateX.value = 0;
      translateY.value = 0;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const swipeThreshold = SCREEN_WIDTH * 0.3;
      const upSwipeThreshold = SCREEN_HEIGHT * 0.2;

      if (event.translationX < -swipeThreshold) {
        translateX.value = withSpring(-SCREEN_WIDTH * 2, {}, () => {
          setCurrentIndex((prev) => (prev + 1) % fashionCards.length);
          translateX.value = withSpring(0);
        });
      } else if (event.translationX > swipeThreshold) {
        translateX.value = withSpring(SCREEN_WIDTH * 2, {}, () => {
          setCurrentIndex((prev) => (prev + 1) % fashionCards.length);
          translateX.value = withSpring(0);
        });
      } else if (event.translationY < -upSwipeThreshold) {
        expandProgress.value = withSpring(1);
        setIsExpanded(true);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-30, 0, 30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const recommendationsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            expandProgress.value,
            [0, 1],
            [SCREEN_HEIGHT, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
      opacity: expandProgress.value,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.cardsContainer}>
          <GestureDetector gesture={gesture}>
            <Animated.View
              entering={FadeIn}
              style={[styles.card, cardAnimatedStyle]}
            >
              <Image
                source={{ uri: fashionCards[currentIndex].image }}
                style={styles.cardImage}
              />
              <BlurView intensity={80} tint="dark" style={styles.cardOverlay}>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>
                    {fashionCards[currentIndex].title}
                  </Text>
                  <Text
                    style={[
                      styles.cardDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {fashionCards[currentIndex].description}
                  </Text>
                  <View style={styles.swipeHint}>
                    <ChevronUp size={24} color={colors.primary} />
                    <Text
                      style={[
                        styles.swipeHintText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Swipe up for recommendations
                    </Text>
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          </GestureDetector>
        </View>

        <Animated.View
          style={[
            styles.recommendationsContainer,
            recommendationsAnimatedStyle,
          ]}
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={styles.recommendationsBlur}
          >
            <View style={styles.recommendationsHeader}>
              <Text
                style={[styles.recommendationsTitle, { color: colors.text }]}
              >
                Recommended Items
              </Text>
              <Pressable
                onPress={() => {
                  expandProgress.value = withSpring(0);
                  setIsExpanded(false);
                }}
                style={styles.closeButton}
              >
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendationsList}
            >
              {fashionCards[currentIndex].recommendations.map((item) => (
                <Animated.View
                  key={item.id}
                  entering={FadeIn.delay(item.id * 100)}
                  style={[styles.recommendationCard]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.recommendationImage}
                  />
                  <View style={styles.recommendationInfo}>
                    <Text
                      style={[
                        styles.recommendationName,
                        { color: colors.text },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.recommendationPrice,
                        { color: colors.primary },
                      ]}
                    >
                      {item.price}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </ScrollView>
          </BlurView>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardContent: {
    padding: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  swipeHint: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  swipeHintText: {
    fontSize: 14,
    fontWeight: '500',
  },
  recommendationsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.6,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  recommendationsBlur: {
    flex: 1,
    padding: 20,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  recommendationsList: {
    flex: 1,
  },
  recommendationCard: {
    width: SCREEN_WIDTH * 0.4,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  recommendationImage: {
    width: '100%',
    height: SCREEN_WIDTH * 0.4,
  },
  recommendationInfo: {
    padding: 12,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
});
