import { View } from 'react-native';
import ItemText from './Text';
const ItemCount = ({ label, count }) => {
  const countInK = (item) => {
    let count = '0';

    if (item && item >= 1000) {
      count = (item / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      return count;
    }
    return item;
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <ItemText fontWeight="bold">{countInK(count)}</ItemText>
      <ItemText>{label}</ItemText>
    </View>
  );
};

export default ItemCount;
