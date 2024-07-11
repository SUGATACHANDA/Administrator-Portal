import { db } from "@/lib/firebase";
import { Store } from "@/types-db";
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
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!params.storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    const { name } = body;
    if (!name) {
      return new NextResponse("Store Name is MISSING", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);
    await updateDoc(docRef, { name });
    const store = (await getDoc(docRef)).data() as Store;

    return NextResponse.json(store);
  } catch (error) {
    console.log(`STORES_PATCH:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!params.storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);

    //TODO: Delete all subcollections along with the data
    //billboards and its images
    //categories
    //sizes
    //kitchens
    // cuisines
    //products and its images
    //orders and its images

    await deleteDoc(docRef);

    return NextResponse.json({
      msg: "Store and all of its subcollection deleted",
    });
  } catch (error) {
    console.log(`STORES_PATCH:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
