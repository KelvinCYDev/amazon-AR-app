import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { Header } from "@/components/Shared/header/Header";
import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <CartProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(search)" />
              <Stack.Screen
                name="login"
                options={{
                  headerShown: true,
                  header: (props) => <Header {...props} />,
                  presentation: "fullScreenModal",
                }}
              />
            </Stack>
          </TamaguiProvider>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
