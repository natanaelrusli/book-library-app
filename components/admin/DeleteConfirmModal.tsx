// filepath: /Users/nata.nael/Mountain of codes/NextJS/university-library/components/admin/DeleteConfirmModal.tsx
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteConfirmModalProps {
  userId: string;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmModal = ({
  onDelete,
  userId,
  loading = false,
  isOpen,
  onClose,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div className='cursor-pointer text-red-400'>
          <Trash2Icon />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant='outline' onClick={onClose}>
              No
            </Button>
          </DialogTrigger>
          <Button
            variant='destructive'
            type='submit'
            disabled={loading}
            onClick={() => {
              onDelete(userId);
              onClose();
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
