import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CuisineClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Cuisine, Kitchen, Size } from "@/types-db";
import { CuisineColumns } from "./components/columns";
import { format } from "date-fns";

const CuisinePage = async ({ params }: { params: { storeId: string } }) => {
  const cuisineData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "cuisines"))
  ).docs.map((doc) => doc.data()) as Cuisine[];

  const formattedCuisine: CuisineColumns[] = cuisineData.map((item) => ({
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
        <CuisineClient data={formattedCuisine}/>
      </div>
    </div>
  );
};

export default CuisinePage;
