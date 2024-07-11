import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { KitchenClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Kitchen, Size } from "@/types-db";
import { KitchenColumns } from "./components/columns";
import { format } from "date-fns";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const kitchenData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
  ).docs.map((doc) => doc.data()) as Kitchen[];

  const formattedKitchen: KitchenColumns[] = kitchenData.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <KitchenClient data={formattedKitchen}/>
      </div>
    </div>
  );
};

export default SizePage;
