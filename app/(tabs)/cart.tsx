import DefaultButton from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Image, ScrollView, Text, YStack } from "tamagui";

export default function Profile() {
  const session = false;
  const navigation = useNavigation();
  const onClickAuth = () => router.push("/login");
  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Basket",
      onPress: () => Alert.alert("Basket"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, [navigation.setOptions]);

  return (
    <ScrollView f={1} bg={"white"} contentContainerStyle={{ pb: 20 }}>
      <DeliveryLocation />
      <YStack f={1} jc={"center"} ai={"center"} gap={20} px={20}>
        <Image source={require("@/assets/empty-cart.png")} w={300} h={200} />
        <Text fow={"bold"} fos={26}>
          Your Amazon cart is empty
        </Text>
        <Text color={"$gray11Light"} fos={18}>
          Good stuff goes here
        </Text>
        {!session && (
          <YStack w={"100%"} gap={15} mt={20}>
            <DefaultButton onPress={onClickAuth}>Sign In</DefaultButton>
            <DefaultButton onPress={onClickAuth} variant="secondary">
              Create Account
            </DefaultButton>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
