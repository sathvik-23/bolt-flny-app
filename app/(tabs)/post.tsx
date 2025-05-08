import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Camera, Image as ImageIcon, MapPin, Tag, X } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function PostScreen() {
  const { colors } = useTheme();
  const [postText, setPostText] = useState('');
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable style={styles.cancelButton}>
          <X size={24} color={colors.textSecondary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Post</Text>
        <Pressable 
          style={[
            styles.postButton, 
            { 
              backgroundColor: postText.length > 0 ? colors.primary : colors.disabled,
              opacity: postText.length > 0 ? 1 : 0.7
            }
          ]}
          disabled={postText.length === 0}
        >
          <Text style={[styles.postButtonText, { color: colors.invertedText }]}>Post</Text>
        </Pressable>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <Image 
              source={{ uri: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940` }} 
              style={styles.avatarImage} 
            />
          </View>
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>Alex Johnson</Text>
            <Pressable style={[styles.visibilitySelector, { borderColor: colors.border }]}>
              <Text style={[styles.visibilityText, { color: colors.textSecondary }]}>Public</Text>
              <Text style={[styles.visibilityIcon, { color: colors.textSecondary }]}>▼</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.postInput, { color: colors.text }]}
            placeholder="What's happening?"
            placeholderTextColor={colors.textSecondary}
            multiline
            value={postText}
            onChangeText={setPostText}
          />
        </View>
        
        <View style={styles.mediaPreview}>
          {/* Media preview would go here - for now showing a placeholder */}
          <View style={[styles.mediaPlaceholder, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Text style={[styles.mediaPlaceholderText, { color: colors.textSecondary }]}>
              Add photos or videos to your post
            </Text>
            <Pressable style={[styles.mediaButton, { backgroundColor: colors.primary }]}>
              <Text style={[styles.mediaButtonText, { color: colors.invertedText }]}>Browse</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={[styles.toolsSection, { borderTopColor: colors.border }]}>
          <Text style={[styles.toolsTitle, { color: colors.text }]}>Add to your post</Text>
          <View style={styles.toolsRow}>
            <Pressable style={styles.toolButton}>
              <Camera size={24} color={colors.primary} />
              <Text style={[styles.toolText, { color: colors.text }]}>Camera</Text>
            </Pressable>
            <Pressable style={styles.toolButton}>
              <ImageIcon size={24} color="#4CAF50" />
              <Text style={[styles.toolText, { color: colors.text }]}>Gallery</Text>
            </Pressable>
            <Pressable style={styles.toolButton}>
              <MapPin size={24} color="#FF9800" />
              <Text style={[styles.toolText, { color: colors.text }]}>Location</Text>
            </Pressable>
            <Pressable style={styles.toolButton}>
              <Tag size={24} color="#9C27B0" />
              <Text style={[styles.toolText, { color: colors.text }]}>Tag</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 4,
  },
  postButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  visibilitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  visibilityText: {
    fontSize: 12,
    marginRight: 4,
  },
  visibilityIcon: {
    fontSize: 10,
  },
  inputContainer: {
    paddingHorizontal: 16,
  },
  postInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
  },
  mediaPreview: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  mediaPlaceholder: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaPlaceholderText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 12,
  },
  mediaButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mediaButtonText: {
    fontWeight: '600',
  },
  toolsSection: {
    marginTop: 24,
    borderTopWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  toolsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolButton: {
    alignItems: 'center',
    width: '22%',
  },
  toolText: {
    fontSize: 12,
    marginTop: 4,
  },
});