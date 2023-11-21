"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <USCProvider
      mode="payment"  //được đặt là "payment", có thể chỉ ra rằng đang ở trong quá trình thanh toán.
      cartMode="client-only"  //giỏ hàng có thể chỉ được quản lý trên phía client (trình duyệt), không tương tác với server.
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="https://localhost:3000/stripe/success"
      cancelUrl="https://localhost:3000/stripe/error"
      currency="USD"
      billingAddressCollection={false}  //có cần thu thập thông tin địa chỉ thanh toán từ người dùng hay không. Ở đây, nó được đặt là false, có nghĩa là không thu thập.
      shouldPersist={true} // xem trạng thái của giỏ hàng nên được lưu giữ (persist) giữa các phiên làm việc hay không.
      language="en-US"
    >
      {children}
    </USCProvider>
  )
}

export default CartProvider
