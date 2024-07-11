"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@/types-db";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CuisineColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface CuisineClientProps{
  data: CuisineColumns[]
}

export const CuisineClient = ({data}: CuisineClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cuisine (${data.length})`}
          description="Manage Cuisine for your Store"
        />
        <Button
          title="Add New Cuisine"
          onClick={() => router.push(`/${params.storeId}/cuisines/create`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />      
      <DataTable searchKey="name" columns={columns} data={data}/>

      <Heading title="APIs" description="API calls for Cuisine"/>
      <Separator />
      <ApiList entityName="cuisines" entityNameId="cuisineId"/>
    </>
  );
};
