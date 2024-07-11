import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CategoryClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Category } from "@/types-db";
import { CategoryColumns } from "./components/columns";
import { format } from "date-fns";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const categoryData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
  ).docs.map((doc) => doc.data()) as Category[];

  const formattedCategory: CategoryColumns[] = categoryData.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboardLabel,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategory}/>
      </div>
    </div>
  );
};

export default CategoryPage;
