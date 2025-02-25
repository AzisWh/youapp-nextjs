'use client';
import React, { useState, useEffect } from 'react';
import arrow from '../../public/images/icons/back-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import Link from 'next/link';
import useTagHooks from '@/hooks/useTagHooks';
import { TagField } from '@/components/TagField';
import Swal from 'sweetalert2';

const Interest = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'belum login');
      router.push('/login');
    }
  }, [router]);
  const handleBack = () => {
    router.back();
  };

  const MAX_TAGS = 5;

  const { tags, setTags, handleAddTag, handleRemoveTag } =
    useTagHooks(MAX_TAGS);
  // test
  // const handleSubmit = () => {
  //   console.log(tags);
  // };

  useEffect(() => {
    const savedTags = localStorage.getItem('tags');
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, [setTags]);
  // save tag static
  const localSubmit = (e: React.FormEvent) => {
    localStorage.setItem('tags', JSON.stringify(tags));
    router.push('/Home');
  };

  return (
    <div>
      <div className="relative flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Image
            src={arrow}
            alt="backarrow"
            width={7}
            height={14}
            onClick={handleBack}
            className="cursor-pointer"
          />
          <p className="text-white font-bold text-[14px]">Back</p>
        </div>

        <p
          className="absolute right-0 cursor-pointer font-bold text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] to-[#AADAFF]"
          onClick={localSubmit}>
          Save
        </p>
      </div>

      <div className="flex-1 pt-10 px-4">
        <h1 className="font-bold text-[24px] text-white">
          What interests you?
        </h1>
        <TagField
          tags={tags}
          addTag={handleAddTag}
          removeTag={handleRemoveTag}
          maxTags={MAX_TAGS}
        />
      </div>
    </div>
  );
};

export default Interest;
