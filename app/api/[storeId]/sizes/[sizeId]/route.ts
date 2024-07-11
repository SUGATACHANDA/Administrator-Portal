import { db } from "@/lib/firebase";
import { Billboards, Category, Size } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    const { name, value } = body;

    if (!name) {
      return new NextResponse("Size Name is MISSING", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Size Value is MISSING", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is MISSING", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-Authorised Access", { status: 500 });
      }
    }

    const sizeRef = await getDoc(
      doc(db, "stores", params.storeId, "sizes", params.sizeId)
    );

    if (sizeRef.exists()) {
      await updateDoc(
        doc(db, "stores", params.storeId, "sizes", params.sizeId),
        {
          ...sizeRef.data(),
          name,
          value,
          updatedAt: serverTimestamp(),
        }
      );
    } else {
      return new NextResponse("Size Not Found", { status: 404 });
    }

    const size = (
      await getDoc(
        doc(db, "stores", params.storeId, "sizes", params.sizeId)
      )
    ).data() as Size;

    return NextResponse.json(size);
  } catch (error) {
    console.log(`SIZE_PATCH:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is MISSING", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size Id is MISSING", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-Authorised Access", { status: 500 });
      }
    }

    const sizeRef = doc(
      db,
      "stores",
      params.storeId,
      "sizes",
      params.sizeId
    );

    await deleteDoc(sizeRef);


    return NextResponse.json({msg: "Size Deleted"});
  } catch (error) {
    console.log(`SIZE_DELETE:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
