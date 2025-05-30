import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteCard from '../components/NoteCard';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const Dashboard = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
    // Écouter les changements de focus pour recharger les notes à chaque retour
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  // Charger les notes depuis le stockage local AsyncStorage
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        // Trier par date de création (plus récent en premier)
        parsedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  // Gérer le clic sur une note pour naviguer vers la vue détaillée
  const handleNotePress = (note) => {
    navigation.navigate('NoteView', { note });
  };

  // Gérer l'ajout d'une nouvelle note
  const handleAddNote = () => {
    navigation.navigate('NoteForm');
  };

  // Affichage quand aucune note n'existe encore
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={80} color={COLORS.secondary} />
      <Text style={styles.emptyTitle}>No notes yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to create your first note
      </Text>
    </View>
  );

  // Rendu d'une note individuelle dans la liste
  const renderNote = ({ item }) => (
    <NoteCard note={item} onPress={() => handleNotePress(item)} />
  );

  return (
    <View style={styles.container}>
      {notes.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {/* Bouton flottant pour ajouter une nouvelle note */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SIZES.margin,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: COLORS.light,
    margin: SIZES.margin,
    borderRadius: SIZES.borderRadius * 2,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default Dashboard;