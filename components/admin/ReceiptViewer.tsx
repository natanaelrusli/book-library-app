import { DocumentProps, PDFViewer } from "@react-pdf/renderer";
import { Modal } from "antd";
import React, { ReactElement } from "react";

type ReceiptViewerProps = {
  show: boolean;
  receipt: ReactElement<DocumentProps, string>;
  title?: string;
  onClose: () => void;
};

const ReceiptViewer = ({
  show,
  receipt,
  title,
  onClose,
}: ReceiptViewerProps) => {
  return (
    <Modal
      title={title}
      open={show}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
    >
      <div className='mt-10'>
        <PDFViewer className='h-[600px] w-full'>{receipt}</PDFViewer>
      </div>
    </Modal>
  );
};

export default ReceiptViewer;
