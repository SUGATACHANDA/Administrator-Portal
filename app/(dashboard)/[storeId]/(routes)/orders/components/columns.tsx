"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import CellImage from "./cell-image";
import { cn } from "@/lib/utils";

export type OrderColumns = {
  id: string;
  name: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  images: string[];
  isPaid: boolean;
  orderStatus: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "images",
    header: "Order Image",
    cell: ({ row }) => (
      <div className="grid grid-cols-2 gap-2">
        <CellImage data={row.original.images} />
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: "Order Name",
  },
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Amount",
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
    cell: ({ row }) => {
      const { isPaid } = row.original;
      return (
        <p
          className={cn(
            "text-base font-semibold",
            isPaid ? "text-emerald-500" : "text-red-500 "
          )}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </p>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const { orderStatus } = row.original;
      return (
        <p
          className={cn(
            "text-base font-bold",
            orderStatus === "Delivering" && "text-yellow-500" ||
            orderStatus === "Processing" && "text-orange-500" ||
            orderStatus === "Delivered" && "text-emerald-500" ||
            orderStatus === "Cancelled" && "text-red-500"
          )}
        >
          {orderStatus}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
