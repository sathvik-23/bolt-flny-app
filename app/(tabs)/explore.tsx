import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// List of images from both folders
const images = [
  // FLNY-F-Pics
  require('../../assets/FLNY-F-Pics/6fcae91b-d0a8-4e47-b9ce-64fc0baab12b.jpeg'),
  require('../../assets/FLNY-F-Pics/65218e9c-5228-497b-acb9-d1dd2851c062.jpeg'),
  require('../../assets/FLNY-F-Pics/Looking to channel the old money rich vibe_ Our….jpeg'),
  require('../../assets/FLNY-F-Pics/1c71b06c-61ee-4aba-b197-e429f7648877.jpeg'),
  require('../../assets/FLNY-F-Pics/40179e42-167e-4d7e-981a-41be659fc65c.jpeg'),
  require('../../assets/FLNY-F-Pics/be8b4028-ea1d-468a-88f7-acee2aeb9db0.jpeg'),
  require('../../assets/FLNY-F-Pics/828268e5-eec2-4e57-b56d-875535a07195.jpeg'),
  require('../../assets/FLNY-F-Pics/Bold shirts and complementary pants can bring your….jpeg'),
  require('../../assets/FLNY-F-Pics/72667b3c-c9fc-4640-a6d9-2ea159496dc1.jpeg'),
  require('../../assets/FLNY-F-Pics/#oldmoney #outfit #ralphlaurenwomensclothing….jpeg'),
  require('../../assets/FLNY-F-Pics/b52324a8-d2b1-4f59-8e7f-c37836f6d1a5.jpeg'),
  require('../../assets/FLNY-F-Pics/ce7d39d6-94fe-4a6f-bed6-a95145a91055.jpeg'),
  require('../../assets/FLNY-F-Pics/7a7e5098-08b2-434d-871c-3e19f2ee8f15.jpeg'),
  require('../../assets/FLNY-F-Pics/_.jpeg'),
  // FLNY-M-Pics
  require('../../assets/FLNY-M-Pics/Ig_shamlanalkhaldi.jpeg'),
  require("../../assets/FLNY-M-Pics/Men's Outfit Ideas for 2025_ Mastering Style….jpeg"),
  require('../../assets/FLNY-M-Pics/90c80ee3-b307-46e6-8104-8970200c2aae.jpeg'),
  require('../../assets/FLNY-M-Pics/#menstyle #menoutfit #menoutfitideas #menoutfit….jpeg'),
  require('../../assets/FLNY-M-Pics/6a683cdc-2847-40db-85c1-7034ac822713.jpeg'),
  require('../../assets/FLNY-M-Pics/Street vibes and urban edge – dive into the world….jpeg'),
  require('../../assets/FLNY-M-Pics/man casual outfit loooks.jpeg'),
  require('../../assets/FLNY-M-Pics/Trendy  mens T Shirts Casual Basic Going Out Tops….jpeg'),
  require('../../assets/FLNY-M-Pics/e9f96e9e-0868-4349-a956-f70f8afa9b38.jpeg'),
  require('../../assets/FLNY-M-Pics/Old money aesthetic, internet personality… (1).jpeg'),
  require("../../assets/FLNY-M-Pics/We've curated the 6 best old money outfits for….jpeg"),
  require('../../assets/FLNY-M-Pics/Explore the finest in classy & elegant old money….jpeg'),
  require('../../assets/FLNY-M-Pics/Old money aesthetic, internet personality….jpeg'),
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const cardSpacing = 2;
const cardWidth = (screenWidth - cardSpacing * (numColumns + 1)) / numColumns;

export default function ExploreScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={images}
        keyExtractor={(_, idx) => idx.toString()}
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
            <Image source={item} style={styles.cardImage} resizeMode="cover" />
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
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: cardSpacing,
    height: cardWidth,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
