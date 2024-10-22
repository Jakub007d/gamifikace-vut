import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const SumaryView = () => {
  const { score } = useLocalSearchParams(); // Hook musí byť vnútri komponenty

  return (
    <View>
      <Text>Skore je : {score}</Text>
    </View>
  );
};

export default SumaryView;
