"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity"; //urlFor sẽ liên quan đến xử lý và tạo URL cho nội dung, đặc biệt là hình ảnh từ Sanity.

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export default function AddToBag({
  currency, //tiền tệ
  description,
  image,                     //6 cái này truyền props qua AddToBag bên [slug]/page.tsx
  name,
  price,
  price_id
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <Button
      onClick={() => { addItem(product), handleCartClick() }}
    >
      Add To Cart
    </Button>
  );
}