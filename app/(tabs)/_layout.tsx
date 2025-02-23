import { Tabs } from "expo-router";
import { XStack, YStack, Text } from "tamagui";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Header } from "@/components/Shared/header/Header";

interface Tab {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

export default function TabLayout() {
  const tabs: Tab[] = [
    {
      name: "index",
      icon: "home-outline",
    },
    {
      name: "profile",
      icon: "account-outline",
    },
    {
      name: "cart",
      icon: "cart-check",
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            // Todo: Custom header
            header: (props) => <Header {...props} />,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <YStack f={1} mt={-5} gap={10} jc={"space-between"} ai={"center"}>
                <XStack
                  w={50}
                  h={4}
                  br={20}
                  bg={focused ? "#238db0" : "$colorTransparent"}
                />
                {/* Todo: Add icon */}
                <MCIcon
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "black"}
                />
                {/* Todo: Items.length in the cart */}
                {tab.name === "cart" && (
                  <Text
                    px={4}
                    br={10}
                    pos="absolute"
                    top={11}
                    bg={"white"}
                    fow={"bold"}
                    fos={12}
                    color={focused ? "#238db0" : "black"}
                  >
                    0
                  </Text>
                )}
              </YStack>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
