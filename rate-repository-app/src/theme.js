import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#14171a',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBackground: '#24292e',
    neutral: '#fff',
  },
  fontSizes: {
    body: 16,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  padding: {
    PaddingX: 10,
    PaddingY: 10,
  },
  rowDisplay: {
    flexDisplay: 'flex',
    flexRow: 'row',
    flexStart: 'flex-start',
  },
  columnDisplay: {
    display: 'flex',
    flexColumn: 'column',
    flexStart: 'flex-start',
    columnReverse: 'column-reverse',
  },
};

export default theme;
