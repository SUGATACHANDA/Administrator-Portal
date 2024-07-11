"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@/types-db";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface SizeClientProps{
  data: SizeColumns[]
}

export const SizeClient = ({data}: SizeClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage Sizes for your Store"
        />
        <Button
          title="Add New Size"
          onClick={() => router.push(`/${params.storeId}/sizes/create`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />      
      <DataTable searchKey="name" columns={columns} data={data}/>

      <Heading title="APIs" description="API calls for Sizes"/>
      <Separator />
      <ApiList entityName="sizes" entityNameId="sizeId"/>
    </>
  );
};
