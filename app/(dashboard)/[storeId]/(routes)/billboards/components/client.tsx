"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@/types-db";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface BillboardClientProps{
  data: BillboardColumns[]
}

export const BillboardClient = ({data}: BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage Billboards for your Store"
        />
        <Button
          title="Add New Billboard"
          onClick={() => router.push(`/${params.storeId}/billboards/create`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />      
      <DataTable searchKey="label" columns={columns} data={data}/>

      <Heading title="APIs" description="API calls for Billboards"/>
      <Separator />
      <ApiList entityName="billboards" entityNameId="billboardId"/>
    </>
  );
};
