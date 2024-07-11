"use client"
import { StoreModal } from "@/components/modal/store-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => {
      setisMounted(true)   
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <>
            <StoreModal />
        </>
    )
    
}