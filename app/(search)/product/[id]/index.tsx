import { supabase } from "@/supabase";
import { Product } from "@/types/product";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  XStack,
  Button,
  YStack,
  Dialog,
} from "tamagui";
import { offPercentage } from "@/utils/number";
import PRIME from "@/assets/prime-label.png";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { deliveryDate } from "@/utils/date";
import DefaultButton from "@/components/Shared/DefaultButton";
import { FlatList } from "react-native";
import { useCart } from "@/context/CartProvider";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const onViewType = (viewType: "3D" | "AR") => {
    router.push(`/product/${viewType}?modelUrl=${product?.model3DUrl}`);
  };

  const onSelectQuantity = (num: number) => {
    setQuantity(num);
    setSelectOpen(false);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const { data = null } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) router.back();
      setProduct(data);
    } catch (err) {
      console.log("error", err);
    }
  }, [id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  if (!product) return null;

  return (
    <>
      <ScrollView f={1} gap={20} bg={"white"} p={20}>
        <Text color={"$color.gray8Dark"}>{product.name}</Text>
        <Image
          source={{ uri: product.imageUrl ?? "" }}
          h={450}
          objectFit="contain"
        />
        <XStack jc={"space-between"}>
          {product.model3DUrl && (
            <>
              {["3D", "AR"].map((viewType) => (
                <Button
                  key={viewType}
                  bw={1}
                  br={50}
                  bc="#0e4db3"
                  variant="outlined"
                  textProps={{ color: "#0e4db3", fos: 13 }}
                  onPress={() => onViewType(viewType as "3D" | "AR")}
                >
                  {viewType === "3D" ? "VIEW IN 3D" : "VIEW IN YOUR ROOM"}
                </Button>
              ))}
            </>
          )}
        </XStack>
        <XStack ai={"center"} gap={10} my={10}>
          {product.previousPrice > product.currentPrice && (
            <Text fos={30} color={"$red10Light"}>
              -{offPercentage(product.currentPrice, product.previousPrice)}%
            </Text>
          )}
          <Text fos={30}>
            <Text fos={20}>$</Text>
            {product.currentPrice}
          </Text>
        </XStack>
        <Text mb={20} color={"gray"} fos={14} textDecorationLine="line-through">
          ${product.previousPrice}
        </Text>
        {product.isAmazonChoice && <Image source={PRIME} h={30} w={70} />}
        <Text>
          The prices of products sold on Amazon include tax. Depending on your
          delivery address, tax may vary at the checkout. For more information
          click here.
        </Text>
        <XStack my={20}>
          <Text>
            {product.deliveryPrice === 0 ? "FREE" : `$${product.deliveryPrice}`}
            {" Delivery "}
          </Text>
          <Text fow={"bold"}>{deliveryDate(product.deliveryInDays)}</Text>
        </XStack>
        <YStack gap={20} mb={30}>
          {product.amountInStock > 20 ? (
            <Text fos={20} color={"green"}>
              In Stock
            </Text>
          ) : (
            <Text fos={20} color={"red"}>
              {product.amountInStock} In Stock
            </Text>
          )}
          <Button onPress={() => setSelectOpen((prev) => !prev)}>
            <Text mr={"auto"}>Quantity: {quantity}</Text>
            <MCIcon name="chevron-down" size={20} />
          </Button>
          <DefaultButton onPress={() => addItem(product, quantity)}>
            Add to basket
          </DefaultButton>
          <DefaultButton bg="$orange9Light" onPress={() => {}}>
            Buy Now
          </DefaultButton>
        </YStack>
      </ScrollView>
      <Dialog open={selectOpen}>
        <Dialog.Portal key={"select-quantity"}>
          <Dialog.Overlay onPress={() => setSelectOpen(false)} />
          <Dialog.Content gap={10} w={"60%"}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              ItemSeparatorComponent={() => <View h={10} />}
              renderItem={({ item }) => (
                <Button
                  key={"button" + item.toString()}
                  onPress={() => onSelectQuantity(item)}
                >
                  {item.toString()}
                </Button>
              )}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
