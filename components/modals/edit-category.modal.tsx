"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

export const EditCategoryDialog = ({ category }: { category: Category }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(category.name);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/category/${category.id}`, { title });
      toast.success("Category updated");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log("Error while updating category: ", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-muted bg-background text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-primary"
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer hover:opacity-70"
          >
            <path
              d="M12.304 3.34399L15.156 6.19599M5 5.49999H2C1.73478 5.49999 1.48043 5.60535 1.29289 5.79289C1.10536 5.98042 1 6.23478 1 6.49999V16.5C1 16.7652 1.10536 17.0196 1.29289 17.2071C1.48043 17.3946 1.73478 17.5 2 17.5H13C13.2652 17.5 13.5196 17.3946 13.7071 17.2071C13.8946 17.0196 14 16.7652 14 16.5V12M16.409 2.08999C16.5964 2.2773 16.745 2.49969 16.8464 2.74445C16.9478 2.98921 17 3.25156 17 3.51649C17 3.78143 16.9478 4.04378 16.8464 4.28854C16.745 4.5333 16.5964 4.75569 16.409 4.94299L9.565 11.787L6 12.5L6.713 8.93499L13.557 2.09099C13.7442 1.90353 13.9664 1.75481 14.2111 1.65334C14.4558 1.55186 14.7181 1.49963 14.983 1.49963C15.2479 1.49963 15.5102 1.55186 15.7549 1.65334C15.9996 1.75481 16.2218 1.90353 16.409 2.09099V2.08999Z"
              stroke="#004050"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Update the category name. This will be reflected wherever the category is used.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category name</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category name"
            disabled={isLoading}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading || !title.trim()}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};