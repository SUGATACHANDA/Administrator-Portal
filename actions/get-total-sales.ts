import { db } from "@/lib/firebase";
import { collection, doc, getDocs } from "firebase/firestore";

export const getTotalSales = async (storeId: string) => {
  const orderData = await getDocs(
    collection(doc(db, "stores", storeId), "orders")
  );
  const count = orderData.size

  return count
};
