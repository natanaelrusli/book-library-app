import { createContext, ReactElement, useContext } from "react";
import { BorrowStatusEnum } from "@/db/schema";
import { DocumentProps } from "@react-pdf/renderer";
import { BorrowHistory } from "@/types";

type BorrowRequestContextType = {
  generateReceipt: (
    borrowRequest: BorrowHistory
  ) => ReactElement<DocumentProps, string>;
  onUpdateStatus: (
    borrowStatus: BorrowStatusEnum,
    borrowDataId: string
  ) => Promise<void>;
};

export const BorrowRequestContext =
  createContext<BorrowRequestContextType | null>(null);

export const useBorrowRequestContext = () => {
  const context = useContext(BorrowRequestContext);
  if (!context) {
    throw new Error(
      "useBorrowRequestContext must be used within a BorrowRequestProvider"
    );
  }
  return context;
};
