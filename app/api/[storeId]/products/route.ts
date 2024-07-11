import { db } from "@/lib/firebase";
import { Category, Products, Size } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    const {
      name,
      price,
      images,
      isFeatured,
      isArchived,
      category,
      size,
      kitchen,
      cuisine,
    } = body;

    if (!name) {
      return new NextResponse("Product Name is MISSING", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Product Price is MISSING", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse(" Product Images is MISSING", { status: 400 });
    }
    if (!category) {
      return new NextResponse("Product Category is MISSING", { status: 400 });
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

    const productData = {
      name,
      price,
      category,
      images,
      isFeatured,
      isArchived,
      size,
      kitchen,
      cuisine,
      createdAt: serverTimestamp(),
    };

    const productRef = await addDoc(
      collection(db, "stores", params.storeId, "products"),
      productData
    );

    const id = productRef.id;

    await updateDoc(doc(db, "stores", params.storeId, "products", id), {
      ...productData,
      id,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ id, billboardData: productData });
  } catch (error) {
    console.log(`PRODUCT_POST:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is MISSING", { status: 400 });
    }

    //get the search params from req.url
    const { searchParams } = new URL(req.url);

    const productRef = collection(
      doc(db, "stores", params.storeId),
      "products"
    );

    let productQuery;

    let queryConstraints = [];

    //construct the query based on searchparams
    if (searchParams.has("size")) {
      queryConstraints.push(where("size", "==", searchParams.get("size")));
    }
    if (searchParams.has("category")) {
      queryConstraints.push(
        where("category", "==", searchParams.get("category"))
      );
    }
    if (searchParams.has("kitchen")) {
      queryConstraints.push(
        where("kitchen", "==", searchParams.get("kitchen"))
      );
    }
    if (searchParams.has("cuisine")) {
      queryConstraints.push(
        where("cuisine", "==", searchParams.get("cuisine"))
      );
    }
    if (searchParams.has("isFeatured")) {
      queryConstraints.push(
        where(
          "isFeatured",
          "==",
          searchParams.get("isFeatured") === "true" ? true : false
        )
      );
    }
    if (searchParams.has("isArchived")) {
      queryConstraints.push(
        where(
          "isArchived",
          "==",
          searchParams.get("isArchived") === "true" ? true : false
        )
      );
    }

    if (queryConstraints.length > 0) {
      productQuery = query(productRef, and(...queryConstraints));
    } else {
      productQuery = query(productRef);
    }

    //execute the query
    const querySnapshots = await getDocs(productQuery);

    const productData: Products[] = querySnapshots.docs.map(
      (doc) => doc.data() as Products
    );

    return NextResponse.json(productData);
  } catch (error) {
    console.log(`PRODUCT_GET:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
