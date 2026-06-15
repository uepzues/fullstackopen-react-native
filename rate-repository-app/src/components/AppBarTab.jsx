import { Pressable, Text as TabText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  font: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.neutral,
    fontWeight: theme.fontWeights.bold,
  },
  padding: {
    padding: theme.padding.BodyTextPadding,
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Pressable {...props}>
      <TabText style={[styles.font, styles.padding]}>{children}</TabText>
    </Pressable>
  );
};
export default AppBarTab;
