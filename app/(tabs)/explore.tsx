import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

const images = [
  {
    id: '1',
    uri: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  },
  {
    id: '2',
    uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: '3',
    uri: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
  },
  {
    id: '4',
    uri: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg',
  },
  {
    id: '5',
    uri: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
  },
  {
    id: '6',
    uri: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg',
  },
  {
    id: '7',
    uri: 'https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg',
  },
  {
    id: '8',
    uri: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg',
  },
  {
    id: '9',
    uri: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
  },
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardSpacing = 12;
const cardWidth = (screenWidth - cardSpacing * (numColumns + 1)) / numColumns;

export default function ExploreScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.cardBackground, width: cardWidth },
            ]}
          >
            <Image
              source={{ uri: item.uri }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    padding: cardSpacing,
    paddingTop: 8,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: cardSpacing,
    height: cardWidth * 1.3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
});
