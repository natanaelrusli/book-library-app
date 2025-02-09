import { createContext, useContext } from "react";
import { BorrowStatusEnum } from "@/db/schema";

type BorrowRequestContextType = {
  onUpdateStatus: (
    borrowStatus: BorrowStatusEnum,
    borrowDataId: string,
  ) => Promise<void>;
};

export const BorrowRequestContext =
  createContext<BorrowRequestContextType | null>(null);

export const useBorrowRequestContext = () => {
  const context = useContext(BorrowRequestContext);
  if (!context) {
    throw new Error(
      "useBorrowRequestContext must be used within a BorrowRequestProvider",
    );
  }
  return context;
};
