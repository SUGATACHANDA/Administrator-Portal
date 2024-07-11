"use client";

import Image from "next/image";

interface CellImageProps {
  data: string[];
}

const CellImage = ({ data }: CellImageProps) => {
  return (
    <>
      {data.map((url, index) => (
        <div
          key={index}
          className="overflow-hidden w-12 h-12 min-h-12 min-w-12 aspect-square rounded-md flex items-center justify-center relative"
        >
          <Image alt="Order Image" fill className="object-contain" src={url} />
        </div>
      ))}
    </>
  );
};

export default CellImage;
