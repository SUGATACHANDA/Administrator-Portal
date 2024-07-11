import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { OrderClient } from "./components/client";
import { db } from "@/lib/firebase";
import { Orders, Size } from "@/types-db";
import { OrderColumns } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const orderData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
  ).docs.map((doc) => doc.data()) as Orders[];

  const formattedOrder: OrderColumns[] = orderData.map((item) => ({
    id: item.id,
    name: item.name,
    isPaid: item.isPaid,
    phone: item.phone,
    address: item.address ,
    products: item.orderItems.map(item => item.name).join(", "),
    orderStatus: item.orderStatus,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        if (item && item.qty !== undefined) {
          return total + Number(item.price * item.qty)
        }
        return total
      }, 0)
    ),
    images: item.orderItems.map(item => item.images[0].url),
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrder}/>
      </div>
    </div>
  );
};

export default OrderPage;
