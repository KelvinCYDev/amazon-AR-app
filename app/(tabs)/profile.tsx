import { ProfileUnauthedBanner } from "@/components/Screens/profile/ProfileUnauthedBanner";
import DefaultButton from "@/components/Shared/DefaultButton";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  Avatar,
  Button,
  Image,
  ScrollView,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import AmazonLogo from "@/assets/amazon-logo.png";

export default function Profile() {
  const session = false;
  const navigation = useNavigation();
  const onClickAuth = () => router.push("/login");

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: Boolean(session),
      headerLeft: !session
        ? () => <Image source={{ uri: AmazonLogo }} w={100} h={30} />
        : null,
    });
  }, [navigation.setOptions, session]);

  return (
    <ScrollView bg={"white"}>
      {session ? (
        // Signed in components
        <XStack jc="space-between" p={20} gap={20}></XStack>
      ) : (
        <YStack f={1} pt={40} ai={"center"} gap={45}>
          <YStack w={"100%"} jc={"center"} ai={"center"} gap={40}>
            <Text ta={"center"} fos={24}>
              Sign in for the optimal experience
            </Text>
            <YStack w={"90%"} gap={15}>
              <DefaultButton onPress={onClickAuth}>Sign In</DefaultButton>
              <DefaultButton onPress={onClickAuth} variant="secondary">
                Create Account
              </DefaultButton>
            </YStack>
          </YStack>
          <ProfileUnauthedBanner />
        </YStack>
      )}
    </ScrollView>
  );
}
