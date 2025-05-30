import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, PRIORITIES, SIZES } from '../constants/theme';

const NoteForm = ({ route, navigation }) => {
  const { note } = route.params || {};
  const isEditing = !!note;

  // États pour les champs du formulaire
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [priority, setPriority] = useState(note?.priority || 'normal');

  // Gérer la sauvegarde de la note (création ou modification)
  const handleSave = async () => {
    // Validation du titre obligatoire
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    // Validation du contenu obligatoire
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your note');
      return;
    }

    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : [];

      if (isEditing) {
        // Mettre à jour une note existante
        const noteIndex = notes.findIndex(n => n.id === note.id);
        if (noteIndex !== -1) {
          notes[noteIndex] = {
            ...notes[noteIndex],
            title: title.trim(),
            content: content.trim(),
            priority,
            updatedAt: new Date().toISOString(),
          };
        }
      } else {
        // Créer une nouvelle note avec ID unique basé sur timestamp
        const newNote = {
          id: Date.now().toString(),
          title: title.trim(),
          content: content.trim(),
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        notes.unshift(newNote); // Ajouter en début de liste
      }

      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  // Rendu d'une option de priorité avec sélection visuelle
  const renderPriorityOption = (priorityKey, priorityData) => (
    <TouchableOpacity
      key={priorityKey}
      style={[
        styles.priorityOption,
        { borderColor: priorityData.color },
        priority === priorityKey && { 
          backgroundColor: priorityData.color,
          borderWidth: 3,
        }
      ]}
      onPress={() => setPriority(priorityKey)}
    >
      <View style={[styles.priorityDot, { backgroundColor: priorityData.color }]} />
      <Text style={[
        styles.priorityLabel,
        priority === priorityKey && { color: COLORS.white }
      ]}>
        {priorityData.label}
      </Text>
      {priority === priorityKey && (
        <Ionicons name="checkmark" size={20} color={COLORS.white} />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Champ titre avec limitation de caractères */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter note title..."
              placeholderTextColor={COLORS.gray}
              maxLength={100}
            />
          </View>

          {/* Sélection de priorité avec couleurs AZIENDA */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {Object.entries(PRIORITIES).map(([key, data]) =>
                renderPriorityOption(key, data)
              )}
            </View>
          </View>

          {/* Champ contenu multiligne */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Write your note here..."
              placeholderTextColor={COLORS.gray}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bouton de sauvegarde avec couleur primaire AZIENDA */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={20} color={COLORS.white} />
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: SIZES.padding,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.margin,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  contentInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.margin,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    minHeight: 200,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  priorityContainer: {
    gap: 12,
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.margin,
    borderWidth: 2,
    gap: 12,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  actionContainer: {
    padding: SIZES.padding,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
});

export default NoteForm;