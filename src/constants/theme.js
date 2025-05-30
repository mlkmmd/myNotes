// Définition des couleurs selon la charte graphique AZIENDA fournie
export const COLORS = {
  primary: '#1148BF',      // Bleu foncé principal
  secondary: '#456890',    // Bleu gris secondaire  
  accent: '#7E4EC',        // Bleu turquoise pour les accents
  danger: '#F45B69',       // Rouge/rose pour les actions dangereuses
  light: '#FFD4CA',        // Rose pâle pour les backgrounds clairs
  background: '#F8F9FA',   // Gris très clair pour le fond
  text: '#2C3E50',         // Gris foncé pour le texte
  gray: '#7F8C8D',         // Gris moyen
  white: '#FFFFFF',        // Blanc pur
};

// Définition des polices Montserrat selon les spécifications
export const FONTS = {
  regular: 'System',
  medium: 'System', 
  bold: 'System',
};

// Système de priorités avec les couleurs de la charte
export const PRIORITIES = {
  important: {
    label: 'Important',
    color: COLORS.danger,    // Rouge pour urgent
    description: 'To be handled quickly'
  },
  normal: {
    label: 'Normal', 
    color: COLORS.primary,   // Bleu principal pour normal
    description: 'Standard priority'
  },
  reminder: {
    label: 'Reminder',
    color: COLORS.secondary, // Bleu gris pour pense-bête
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