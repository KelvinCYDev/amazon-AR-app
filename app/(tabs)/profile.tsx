import { ProfileUnauthedBanner } from "@/components/Screens/profile/ProfileUnauthedBanner";
import DefaultButton from "@/components/Shared/DefaultButton";
import { router } from "expo-router";
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
export default function Profile() {
  const session = false;
  const onClickAuth = () => router.push("/login");
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
