"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { AlertApi } from "./api-alert";

interface ApiListProps{
    entityName: string,
    entityNameId: string
}

const ApiList = ({entityName, entityNameId} : ApiListProps) => {

    const router = useRouter()
    const origin = useOrigin()
    const params = useParams()

    const baseURL = `${origin}/api/${params.storeId}`

    return <>
        <AlertApi 
        title="GET"
        variant="public"
        description={`${baseURL}/${entityName}`}
        />    
        <AlertApi 
        title="GET"
        variant="public"
        description={`${baseURL}/${entityName}/${entityNameId}`}
        />    
        <AlertApi 
        title="POST"
        variant="admin"
        description={`${baseURL}/${entityName}`}
        />    
        <AlertApi 
        title="PATCH"
        variant="admin"
        description={`${baseURL}/${entityName}/${entityNameId}`}
        />    
        <AlertApi 
        title="DELETE"
        variant="admin"
        description={`${baseURL}/${entityName}/${entityNameId}`}
        />    
    </>;
}
 
export default ApiList;