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
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

interface DeleteConfirmModalProps {
  onDelete: () => Promise<void>;
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmModal = ({
  loading = false,
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            onClick={async () => {
              await onDelete();
              onClose();
            }}
          >
            {loading && <Spinner />}
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
