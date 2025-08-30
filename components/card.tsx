'use client';

import { useState } from 'react';
import Image from "next/image";
import { DeleteButton, EditButton } from "@/components/button";
import type { Upload } from "@prisma/client";

const Card = ({ data }: { data: Upload }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(data.image);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin URL: ', err);
    }
  };

  return (
    <div className="max-w-sm border border-gray-200 rounded-md shadow">
      <div className="relative aspect-video">
        <Image
          src={data.image}
          alt={data.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-md object-cover"
        />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {data.title}
        </h1>
  
        <button
          onClick={copyImageUrl}
          className={`mt-3 flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors ${
            isCopied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isCopied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
        
      </div>
      <div className="flex items-center justify-between">
        <EditButton id={data.id} />
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default Card;