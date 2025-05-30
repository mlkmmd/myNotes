import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, PRIORITIES, SIZES } from '../constants/theme';

const NoteView = ({ route, navigation }) => {
  const { note } = route.params;

  // Gérer la modification de la note
  const handleEdit = () => {
    navigation.navigate('NoteForm', { note });
  };

  // Gérer la suppression de la note avec confirmation
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  // Confirmer et exécuter la suppression de la note
  const confirmDelete = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const notes = JSON.parse(storedNotes);
        const updatedNotes = notes.filter(n => n.id !== note.id);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  // Formater la date pour l'affichage complet
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Obtenir les informations de priorité
  const getPriorityInfo = (priority) => {
    return PRIORITIES[priority] || PRIORITIES.normal;
  };

  const priorityInfo = getPriorityInfo(note.priority);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Badge de priorité coloré selon la charte */}
        <View style={[styles.priorityBadge, { backgroundColor: priorityInfo.color }]}>
          <Text style={styles.priorityText}>{priorityInfo.label}</Text>
        </View>
        
        {/* Titre complet de la note */}
        <Text style={styles.title}>{note.title}</Text>
        
        {/* Date de création formatée */}
        <Text style={styles.date}>
          Created: {formatDate(note.createdAt)}
        </Text>
        
        {/* Contenu complet de la note */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{note.content}</Text>
        </View>
      </ScrollView>
      
      {/* Boutons d'action avec couleurs AZIENDA */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="pencil" size={20} color={COLORS.white} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={20} color={COLORS.white} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.medium,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 36,
  },
  date: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginBottom: 24,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  contentText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: SIZES.padding,
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.danger,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
});

export default NoteView;