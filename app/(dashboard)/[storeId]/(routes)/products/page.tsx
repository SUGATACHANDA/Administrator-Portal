import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Products, Size } from "@/types-db";
import { ProductColumns } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";


const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const productData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "products"))
  ).docs.map((doc) => doc.data()) as Products[];

  const formattedProduct: ProductColumns[] = productData.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price),
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    category: item.category,
    size: item.size,
    cuisine: item.cuisine,
    kitchen: item.kitchen,
    images: item.images,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct}/>
      </div>
    </div>
  );
};

export default ProductPage;
