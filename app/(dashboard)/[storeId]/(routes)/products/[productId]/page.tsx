import { db } from "@/lib/firebase";
import {
  Billboards,
  Category,
  Cuisine,
  Kitchen,
  Products,
  Size,
} from "@/types-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductForm } from "./components/product-form";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = (
    await getDoc(
      doc(db, "stores", params.storeId, "products", params.productId)
    )
  ).data() as Products;

  const categoryData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
  ).docs.map((doc) => doc.data()) as Category[];

  const sizesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
  ).docs.map((doc) => doc.data()) as Size[];

  const cuisineData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "cuisines"))
  ).docs.map((doc) => doc.data()) as Cuisine[];

  const kitchenData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
  ).docs.map((doc) => doc.data()) as Kitchen[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categoryData}
          sizes={sizesData}
          cuisines={cuisineData}
          kitchens={kitchenData}
        />
      </div>
    </div>
  );
};

export default BillboardPage;
