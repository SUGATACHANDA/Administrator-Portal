"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@/types-db";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { KitchenColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface KitchenClientProps{
  data: KitchenColumns[]
}

export const KitchenClient = ({data}: KitchenClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Kitchens (${data.length})`}
          description="Manage Kitchen for your Store"
        />
        <Button
          title="Add New Kitchen"
          onClick={() => router.push(`/${params.storeId}/kitchens/create`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />      
      <DataTable searchKey="name" columns={columns} data={data}/>

      <Heading title="APIs" description="API calls for Kitchen"/>
      <Separator />
      <ApiList entityName="kitchens" entityNameId="kitchenId"/>
    </>
  );
};
