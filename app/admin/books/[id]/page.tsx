import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { getBookById } from "@/lib/actions/book";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const book = await getBookById(id);

  return (
    <div>
      <div className='mb-6'>
        <Link href='/admin/books'>
          <Button variant='outline'>
            <ArrowLeft />
            Go Back
          </Button>
        </Link>
      </div>
      <div className='flex flex-col'>
        {/* Top image and data section */}
        <div className='flex gap-6 '>
          <div
            className='flex items-center justify-center rounded-md px-24 py-5 max-xl:px-12'
            style={{
              backgroundColor: book.color,
            }}
          >
            <Image
              src={book.cover}
              width={120}
              height={200}
              alt={book.title}
              className='min-w-[100px] drop-shadow-sm'
            />
          </div>
          <div className='flex flex-col justify-between gap-2'>
            <div className='flex text-dark-200'>
              Created at:
              <span className='ml-3 flex gap-1'>
                <Calendar />
                {book.createdAt ? formatDate(book.createdAt) : "-"}
              </span>
            </div>
            <div className='mt-2'>
              <h1 className='font-ibm-plex-sans text-2xl font-semibold text-[#1E293B]'>
                {book.title}
              </h1>
            </div>
            <div className='text-lg text-dark-100'>
              <p>
                By <span>{book.author}</span>
              </p>
            </div>
            <div className='text-dark-200'>
              <p>{book.genre}</p>
            </div>

            <Link href={`/admin/books/${book.id}/edit`}>
              <Button
                className='bg-primary-admin text-white hover:bg-slate-800'
                size='lg'
                style={{
                  width: 450,
                }}
              >
                <Edit />
                Edit Book
              </Button>
            </Link>
          </div>
        </div>
        {/* Top image and data section end */}

        {/* Split into 2 column, right column will be for book trailer video */}
        <div className='mt-12 flex w-full gap-8 max-xl:flex-col-reverse'>
          <div className='w-7/12 max-xl:w-full'>
            <div className='mb-3 font-bold text-dark-400'>Summary</div>
            <p
              className='text-dark-600'
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: book.summary }}
            />
          </div>

          {book.video && (
            <div className='w-5/12 max-xl:w-full'>
              <div className='mb-3 font-bold text-dark-400'>Video</div>
              <VideoPlayer show={false} videoUrl={book.video} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
