import { db } from "@/lib/firebase";
import { Orders } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";

interface GraphData {
  name: string;
  total: number;
}

export const getOrderStatusTotalRevenue = async (storeId: string) => {
  const orderData = (
    await getDocs(collection(doc(db, "stores", storeId), "orders"))
  ).docs.map((doc) => doc.data()) as Orders[];

  const statusRevenue: { [key: string]: number } = {};

  for (const order of orderData) {
    const status = order.orderStatus

    if (status) {
      let revenueForOrder = 0;
      for (const item of order.orderItems) {
        if (item.qty !== undefined) {
          revenueForOrder += item.price * item.qty;
        } else {
          revenueForOrder += item.price;
        }
      }
      statusRevenue[status] = (statusRevenue[status] || 0) + revenueForOrder;
    }
  }
  const statusMap: { [key: string]: number } = {
    Processing: 0,
    Delivering: 1,
    Delivered: 2,
    Cancelled: 3,
  };
  const graphData: GraphData[] = Object.keys(statusMap).map((statusName) => ({
    name: statusName,
    total: statusRevenue[statusName] || 0,
  }));

  return graphData;
};
