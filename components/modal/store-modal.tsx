"use client";
import Modal from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store Name should contain atleast 3 letters" }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true)
      const response = await axios.post("/api/stores", values)
      toast.success("Store Created Successfully")
      window.location.assign(`/${response.data.id}`)
      // console.log(response)
    } catch (error) {
      toast.error("Something Went Wrong")
    } finally{
      setisLoading(false)
    }
  };

  return (
    <Modal
      title="Create a New Store"
      description="Add a New Store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the Store</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="eCommerce Store Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={isLoading} type="button" variant={"outline"} size={"sm"}>Cancel</Button>
                <Button disabled={isLoading} type="submit" size={"sm"}>Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
