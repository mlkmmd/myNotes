import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, PRIORITIES, SIZES } from '../constants/theme';

const NoteCard = ({ note, onPress }) => {
  // Formater la date pour l'affichage en format court
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Tronquer le contenu si trop long pour l'affichage carte
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Obtenir les informations de priorité selon le niveau
  const getPriorityInfo = (priority) => {
    return PRIORITIES[priority] || PRIORITIES.normal;
  };

  const priorityInfo = getPriorityInfo(note.priority);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* En-tête avec indicateur de priorité coloré et date */}
      <View style={styles.header}>
        <View style={[styles.priorityIndicator, { backgroundColor: priorityInfo.color }]} />
        <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
      </View>
      
      {/* Titre de la note avec limitation à 2 lignes */}
      <Text style={styles.title} numberOfLines={2}>
        {note.title}
      </Text>
      
      {/* Contenu tronqué avec limitation à 3 lignes */}
      <Text style={styles.content} numberOfLines={3}>
        {truncateContent(note.content)}
      </Text>
      
      {/* Pied avec badge de priorité */}
      <View style={styles.footer}>
        <View style={[styles.priorityBadge, { backgroundColor: priorityInfo.color }]}>
          <Text style={styles.priorityText}>{priorityInfo.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius + 4,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    elevation: 3,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  date: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  content: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.medium,
    textTransform: 'uppercase',
  },
});

export default NoteCard;