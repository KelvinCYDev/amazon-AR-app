import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { Text } from "tamagui";

export default function Login() {
  const navigation = useNavigation();

  const onGoBack = () => router.back();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text fos={18} fow={800}>
            Cancel
          </Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text fos={18} fow="bold">
          Amazon.ca
        </Text>
      ),
    });
  }, [navigation.setOptions]);
  return <Text>Login</Text>;
}
