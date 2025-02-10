import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  container: {
    border: "1 solid #D6E0FF",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
  },
  bookDetailContainer: {
    marginTop: "6px",
    fontSize: "12px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
  listItem: {
    marginBottom: 3,
  },
  footer: {
    marginTop: 10,
    fontSize: 10,
    color: "#666",
  },
  termsWrapper: {
    marginTop: 6,
  },
  bookDetailItem: {
    fontSize: 11,
    marginBottom: 2,
  },
});

type ReceiptProps = {
  bookTitle: string;
  fullName: string;
  borrowDate: string;
  dueDate: string;
  coverImage: string;
};

const ReceiptPDF = ({
  bookTitle,
  fullName,
  borrowDate,
  dueDate,
  coverImage,
}: ReceiptProps) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>BookBook Borrow Receipt</Text>
          </View>

          {/* Receipt Details */}
          <View style={styles.section}>
            <Text>
              Receipt ID:{" "}
              <Text style={styles.textBold}>
                841c3387-3c1e-4c59-8527-7f7213fb36af
              </Text>
            </Text>
            <Text>
              Date Issued:{" "}
              <Text style={styles.textBold}>{formatDate(new Date())}</Text>
            </Text>
          </View>

          <Image
            src={coverImage}
            style={{
              width: 100,
              marginBottom: 12,
            }}
          />

          {/* Book Details */}
          <View style={styles.section}>
            <Text
              style={{
                textDecoration: "underline",
              }}
            >
              Book Details:
            </Text>
            <View style={styles.bookDetailContainer}>
              <Text style={styles.bookDetailItem}>
                Borrower: <Text style={styles.textBold}>{fullName}</Text>
              </Text>
              <Text style={styles.bookDetailItem}>
                Title: <Text style={styles.textBold}>{bookTitle}</Text>
              </Text>
              <Text style={styles.bookDetailItem}>
                Borrowed on: <Text style={styles.textBold}>{borrowDate}</Text>
              </Text>
              <Text style={styles.bookDetailItem}>
                Due Date: <Text style={styles.textBold}>{dueDate}</Text>
              </Text>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.section}>
            <Text
              style={{
                textDecoration: "underline",
              }}
            >
              Terms:
            </Text>
            <View style={styles.termsWrapper}>
              <Text style={styles.listItem}>
                - Please return the book by the due date.
              </Text>
              <Text style={styles.listItem}>
                - Lost or damaged books may incur replacement costs.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>Website: bookwise.example.com</Text>
            <Text>Email: support@bookwise.example.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;
