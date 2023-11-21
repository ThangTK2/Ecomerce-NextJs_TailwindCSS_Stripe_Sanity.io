"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity"; //client sẽ liên quan đến cấu hình kết nối với API của Sanity, trong khi urlFor sẽ liên quan đến xử lý và tạo URL cho nội dung, đặc biệt là hình ảnh từ Sanity.
import { useState } from "react";

interface iAppProps {
  images: any;
}

const ImageGallery = ({ images }: iAppProps) => {
  const [bigImage, setBigImage] = useState(images[0]);

  //xử lý click vào ảnh nhỏ sẽ hiện ảnh nhỏ ra ảnh lớn
  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  return (
    // Ảnh chi tiết sản phẩm nhỏ
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, index: any) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              width={200} height={200} alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* Ảnh chi tiết sản phẩm lớn */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Photo" width={500} height={500}
          className="h-full w-full object-cover object-center"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  )
}

export default ImageGallery