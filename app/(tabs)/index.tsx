import { HomeCarousel } from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import DefaultButton from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Text, ScrollView, YStack } from "tamagui";

export default function Home() {
  const navigation = useNavigation();
  let session = false;

  const onClickAuth = () => router.push("/login");

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
    <ScrollView f={1}>
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestions />
      <YStack bg={"white"} w="100%" p={20} gap={20}>
        <Text als={"flex-start"} fos={20} fow={"bold"}>
          {session ? "Deals for you" : "Sign in for your best experience"}
        </Text>
        {session ? (
          {
            /* list of deals */
          }
        ) : (
          <DefaultButton onPress={onClickAuth}>Sign in Securely</DefaultButton>
        )}
      </YStack>
    </ScrollView>
  );
}
