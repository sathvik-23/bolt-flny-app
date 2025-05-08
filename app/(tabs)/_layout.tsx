import { Tabs } from 'expo-router';
import {
  Home,
  Search,
  PlusCircle,
  ShoppingBag,
  User,
} from 'lucide-react-native';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : colors.background,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 84 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0.5,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="dark"
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Animated.View entering={FadeIn}>
              <Home size={24} color={color} strokeWidth={2} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Animated.View entering={FadeIn}>
              <Search size={24} color={color} strokeWidth={2} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, size }) => (
            <Animated.View entering={FadeIn}>
              <PlusCircle size={24} color={color} strokeWidth={2} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="brands"
        options={{
          title: 'Brands',
          tabBarIcon: ({ color, size }) => (
            <Animated.View entering={FadeIn}>
              <ShoppingBag size={24} color={color} strokeWidth={2} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Animated.View entering={FadeIn}>
              <User size={24} color={color} strokeWidth={2} />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}

function CustomHeader({ navigation, route, options }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <View style={styles.headerLeft}>
        <Text style={[styles.logo, { color: colors.primary }]}>FLNY</Text>
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconButton}>
          <Search size={22} color={colors.text} strokeWidth={2} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <BellIcon size={22} color={colors.text} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <ShoppingBag size={22} color={colors.text} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}

function BellIcon({ size, color }) {
  return (
    <View>
      <View style={styles.notificationDot} />
      <View style={[styles.iconContainer, { width: size, height: size }]}>
        <Text style={{ color, fontSize: 14 }}>🔔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    marginTop: Platform.OS === 'ios' ? 47 : 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    zIndex: 1,
  },
});
