// Définition des couleurs de l'application selon la charte graphique AZIENDA
export const COLORS = {
  primary: '#2E3A59',
  secondary: '#3D5A80',
  background: '#F8F9FA',
  text: '#2C3E50',
  gray: '#7F8C8D',
  danger: '#E74C3C',
  white: '#FFFFFF',
  success: '#27AE60',
};

// Définition des polices Montserrat
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

// Définition des niveaux de priorité avec couleurs selon le cahier des charges
export const PRIORITIES = {
  important: {
    label: 'Important',
    color: '#E74C3C', // Rouge pour urgent
    description: 'To be handled quickly'
  },
  normal: {
    label: 'Normal',
    color: '#3498DB', // Bleu pour normal
    description: 'Standard priority'
  },
  reminder: {
    label: 'Reminder',
    color: '#95A5A6', // Gris pour pense-bête
    description: 'Low importance'
  },
};

// Tailles et espacements standardisés
export const SIZES = {
  padding: 20,
  margin: 16,
  borderRadius: 12,
  iconSize: 24,
};