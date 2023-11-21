"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

export default function ShoppingCartModal() {
  const {
    cartCount, //hiển thị số lượng mục trong giỏ hàng trên giao diện người dùng.
    shouldDisplayCart, //mô tả xem giỏ hàng có nên hiển thị hay không. Có thể được sử dụng để điều khiển việc hiển thị giao diện người dùng của giỏ hàng.
    handleCartClick, //khi người dùng nhấp vào giỏ hàng. Thường được sử dụng để mở hoặc đóng giao diện người dùng của giỏ hàng.
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,  // chuyển hướng người dùng đến trang thanh toán (checkout).
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("result");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((item) => ( //Object.values(...):Hàm này là một phương thức của đối tượng Object
                               //cartDetails ?? {}:Đây là một toán tử nullish coalescing (??). Nó kiểm tra xem cartDetails có giá trị null hoặc undefined hay không. Nếu cartDetails có giá trị, thì nó sẽ trả về cartDetails; ngược lại, nếu cartDetails là null hoặc undefined, thì nó sẽ trả về một đối tượng rỗng {}
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.image as string}
                          alt="Product image" width={100} height={100}
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2"> {/**line-clamp-2: hiển thị 2 dòng còn lại ẩn đi */}
                            {item.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <div className="flex">
                            <button
                              type="button" onClick={() => removeItem(item.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                Or{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}