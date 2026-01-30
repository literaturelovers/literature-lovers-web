"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type DocumentListItem = {
  id: string;
  title: string;
};

const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((v) => isValidPhoneNumber(v), "Invalid phone number"),
});

type FormValues = z.infer<typeof schema>;

export const DocumentsGrid = ({ documents }: { documents: DocumentListItem[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: "",
      phone: "",
    }),
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const isSubmitting = form.formState.isSubmitting;

  const onCardClick = (documentId: string) => {
    if (typeof window !== "undefined" && localStorage.getItem("literatureLoversDocumentFormSeen") === "true") {
      window.open(`/${documentId}/read`, "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedDocumentId(documentId);
    setOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    if (!selectedDocumentId) return;
    try {
      const res = await fetch("/api/student/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, documentId: selectedDocumentId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.errors?.name?.[0] ||
          data?.errors?.phone?.[0] ||
          "Failed to save details";
        toast.error(msg);
        return;
      }

      // Store flag in localStorage so the form appears only once
      if (typeof window !== "undefined") {
        localStorage.setItem("literatureLoversDocumentFormSeen", "true");
        localStorage.setItem("literatureLoversUserName", String(form.getValues("name") ?? ""));
        localStorage.setItem("literatureLoversUserPhone", String(form.getValues("phone") ?? ""));
      }

      setOpen(false);
      form.reset(defaultValues);

      window.open(`/${selectedDocumentId}/read`, "_blank", "noopener,noreferrer");
    } catch (e: unknown) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-5xl mx-auto">

        {/* List Section */}
        <div className="flex flex-col w-full">
          {documents.map((document, index) => (
            <div key={document.id} className="divide-y divide-[#E6EAF2]">
              <button
                type="button"
                onClick={() => onCardClick(document.id)}
                className="w-full text-left py-5 hover:bg-gray-50 transition-colors p-3"
              >
                <div className="flex items-center gap-3">
                  {/* NEW Badge */}
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                    NEW
                  </span>
                  {/* Date and Shift */}
                  <span className="text-gray-900 text-base font-normal">
                    {document.title}
                  </span>
                </div>
              </button>
              {/* Separator Line */}
              {index < documents.length - 1 && (
                <div className="w-full h-px bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            form.reset(defaultValues);
            setSelectedDocumentId(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Student details</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={field.value}
                        onChange={(v) => field.onChange(v || "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

