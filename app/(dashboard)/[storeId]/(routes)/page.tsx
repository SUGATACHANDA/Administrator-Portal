import { getGraphTotalRevenue } from "@/actions/get-graph-total-revenue";
import { getOrderTotalRevenueByCategory } from "@/actions/get-graph-total-revenue-by-category";
import { getOrderStatusTotalRevenue } from "@/actions/get-graph-total-revenue-by-order-status";
import { getOrderPaymentStatusTotalRevenue } from "@/actions/get-graph-total-revenue-by-orderStatus";
import { getTotalProducts } from "@/actions/get-total-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getTotalSales } from "@/actions/get-total-sales";
import { Heading } from "@/components/heading";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { formatter } from "@/lib/utils";
import { Store } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";
import { BarChart, IndianRupee, LucideShoppingBag, LucideShoppingCart } from "lucide-react";

interface DashboardOverviewProps {
  params: { storeId: string };
}

const DashboardOverview = async ({ params }: DashboardOverviewProps) => {
    const totalRevenue = await getTotalRevenue(params.storeId)
    const totalSales = await getTotalSales(params.storeId)
    const totalProducts = await getTotalProducts(params.storeId)
    const monthlyGraphRevenue = await getGraphTotalRevenue(params.storeId)
    const orderStatusTotalRevenue = await getOrderPaymentStatusTotalRevenue(params.storeId)
    const revenueByCategory = await getOrderTotalRevenueByCategory(params.storeId)
    const revenueByOderStatus = await getOrderStatusTotalRevenue(params.storeId)
    
  const store = (
    await getDoc(doc(db, "stores", params.storeId))
  ).data() as Store;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description={`Overview of ${store.name} Store`}
        />
        <Separator />
        <div className="grid gap-4 grid-cols-4">
          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <LucideShoppingCart className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalSales}</div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <LucideShoppingBag className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue By Month
              </CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <Overview data={monthlyGraphRevenue}/>     
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue By Payment Status
              </CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <Overview data={orderStatusTotalRevenue}/>     
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue By Category
              </CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <Overview data={revenueByCategory}/>     
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue By Order Status
              </CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <Overview data={revenueByOderStatus}/>     
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
