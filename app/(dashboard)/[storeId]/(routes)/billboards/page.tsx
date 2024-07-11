import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { BillboardClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Billboards } from "@/types-db";
import { BillboardColumns } from "./components/columns";
import { format } from "date-fns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboardData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data()) as Billboards[];

  const formattedBillboard: BillboardColumns[] = billboardData.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard}/>
      </div>
    </div>
  );
};

export default BillboardPage;
