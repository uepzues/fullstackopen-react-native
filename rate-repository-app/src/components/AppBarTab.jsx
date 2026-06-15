import { Pressable, Text as TabText, StyleSheet } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  font: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.neutral,
    fontWeight: theme.fontWeights.bold,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});

const AppBarTab = ({ to, label }) => {
  return (
    <Link
      to={to}
      component={Pressable}
      style={[styles.padding]}
    >
      <TabText style={[styles.font]}>{label}</TabText>
    </Link>
  );
};
export default AppBarTab;
