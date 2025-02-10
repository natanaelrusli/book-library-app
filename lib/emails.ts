import { toast } from "@/hooks/use-toast";
import { BorrowHistory } from "@/types";

export const handleSendReceiptEmail = async (request: BorrowHistory) => {
  try {
    toast({
      title: "Sending email...",
    });
    const res = await fetch("/api/send-email/receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: request.user.email,
        bookTitle: request.book.title,
        fullName: request.user.fullName,
        borrowDate: request.borrowDate,
        dueDate: request.dueDate,
      }),
    });

    const data = await res.json(); // Parse response body as JSON

    if (data.error) {
      toast({
        title: "Error sending email",
        variant: "destructive",
      });
      throw new Error(data.message || "Failed to send email");
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error sending email",
      variant: "destructive",
    });
  }
};
