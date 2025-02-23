import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Button } from "tamagui";

export default function Home() {
  const navigation = useNavigation();

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Alexa Lists",
      onPress: () => Alert.alert("Alexa Lists"),
    },
    {
      title: "Prime",
      onPress: () => Alert.alert("Prime"),
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Video"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, [navigation.setOptions]);
  return (
    <Button bg={"$orange10Light"} onPress={() => router.push("/login")}>
      Login
    </Button>
  );
}
