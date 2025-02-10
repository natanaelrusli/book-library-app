import React from "react";
import { AppConfig } from "@/lib/config";

type ReceiptEmailProps = {
  bookTitle: string;
  fullName: string;
  borrowDate: string;
  dueDate: string;
};

const ReceiptEmail = ({
  bookTitle,
  fullName,
  borrowDate,
  dueDate,
}: ReceiptEmailProps) => {
  return (
    <main
      style={{
        background: "#f3f4f6",
        padding: "24px",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{ borderBottom: "1px solid #6b7280", paddingBottom: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <img
            src='https://ik.imagekit.io/4q1mfykz9w/logo.svg?updatedAt=1739159445993'
            alt='logo'
            width={40}
            height={40}
          />
          <h1>BookBook</h1>
        </div>
      </header>

      <section style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Your Receipt for {bookTitle} is Ready!
        </h1>
        <p style={{ marginTop: "16px" }}>Hi, {fullName},</p>

        <p>
          Your receipt for borrowing {bookTitle} has been generated. Here are
          the details:
        </p>
        <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
          <li>
            Borrowed On:{" "}
            <strong style={{ color: "#3b82f6" }}>{borrowDate}</strong>
          </li>
          <li>
            Due Date: <strong style={{ color: "#ef4444" }}>{dueDate}</strong>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "24px" }}>
        <p>You can download the receipt here:</p>
        <a
          href={`${AppConfig.env.appEndpoint}/sign-in`}
          style={{
            display: "inline-block",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "12px",
          }}
        >
          Download Receipt
        </a>
      </section>

      <footer style={{ marginTop: "24px", fontSize: "14px" }}>
        <p>Keep the pages turning</p>
        <p style={{ fontWeight: "bold" }}>BookBook Team</p>
      </footer>
    </main>
  );
};

export default ReceiptEmail;
