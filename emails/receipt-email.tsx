import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Button,
} from "@react-email/components";

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
    <Html>
      <Head />
      <Preview>{`BookBook Receipt - ${bookTitle}`}</Preview>
      <Tailwind>
        <Body className='m-auto bg-primary-admin px-2 font-sans text-white'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-solid bg-blue-950 p-[20px] text-white shadow-lg'>
            <Section className='mt-[32px]'>
              <Img
                src={`https://ik.imagekit.io/4q1mfykz9w/logo.png?updatedAt=1739161410979`}
                width='40'
                height='37'
                alt='Vercel'
                className='mx-auto my-0'
              />
              <Heading className='mx-0 mb-[10px] mt-[15px] p-0 text-center text-[24px] font-normal'>
                BookBook
              </Heading>
            </Section>
            <Heading className='mx-0 mb-[30px] p-0 text-center text-[24px] font-normal'>
              Your receipt for <strong>{bookTitle}</strong> is{" "}
              <strong>Ready</strong>
            </Heading>
            <Text className='text-[14px] leading-[24px]'>Hi {fullName},</Text>
            <Text className='text-[14px] leading-[24px]'>
              Your receipt for borrowing, {bookTitle} has been generated, here
              are the details:
            </Text>
            <Section>
              <Row className='mb-4'>
                <Column align='left'>
                  <Text className='text-[14px] leading-[24px]'>
                    <ul>
                      <li>
                        <Text>
                          Borrowed on:{" "}
                          <span className='font-bold underline underline-offset-2'>
                            {borrowDate}
                          </span>
                        </Text>
                      </li>
                      <li>
                        <Text>
                          Due Date:{" "}
                          <span className='font-bold underline underline-offset-2'>
                            {dueDate}
                          </span>
                        </Text>
                      </li>
                    </ul>
                  </Text>
                </Column>
              </Row>
              <Row>
                <Button className='box-border w-[200px] cursor-pointer rounded-[8px] bg-indigo-600 p-[12px] text-center font-semibold text-white'>
                  Download Receipt
                </Button>
              </Row>
            </Section>
            <Hr className='mx-0 my-[26px] w-full border border-solid border-[#eaeaea]' />
            <Text className='text-[12px] leading-[24px] text-light-600'>
              Keep the pages turning
              <br />
              The BookWise Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ReceiptEmail.PreviewProps = {
  fullName: "Nata Nael",
  bookTitle: "Sapiens",
  borrowDate: new Date().toString(),
  dueDate: new Date().toString(),
} as ReceiptEmailProps;

export default ReceiptEmail;
