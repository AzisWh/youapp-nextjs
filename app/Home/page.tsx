'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import arrow from '../../public/images/icons/back-left.svg';
import profileBg from '../../public/images/imagetest.svg';
import pencilIcon from '../../public/images/icons/pencil.svg';
import Swal from 'sweetalert2';
import Button from '@/components/Button';

interface tagsProps {
  interest: string[];
}

const Home = () => {
  const router = useRouter();
  // dummy
  useEffect(() => {
    const fakeToken = localStorage.getItem('token');

    if (!fakeToken) {
      Swal.fire('Error', 'belum login');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire('Success', 'yey logout');
    router.push('/login');
  };

  const [isEditAbout, setIsEditAbout] = useState(false);
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    birthday: '',
    horoscope: '',
    zodiac: '',
    height: '',
    weight: '',
  });

  const [tags, setTags] = useState<string[]>([]);

  const [tempProfile, setTempProfile] = useState(profile);

  const handleAboutEditToggle = () => {
    setTempProfile(profile);
    setIsEditAbout(!isEditAbout);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSaveAbout = () => {
    setProfile(tempProfile);
    setIsEditAbout(false);
  };

  // const handleBack = () => {
  //   router.back();
  // };

  const handleBack = () => {
    Swal.fire({
      title: 'Apakah ingin logout?',
      text: 'Anda akan keluar dari akun ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        Swal.fire('Logged Out!', 'Anda telah logout.', 'success');
        router.push('/login');
      }
    });
  };

  const handleInterestEdit = () => {
    router.push('/interest');
  };

  useEffect(() => {
    const tags = localStorage.getItem('tags');
    if (tags) {
      setTags(JSON.parse(tags));
    }
  }, []);

  const isProfileEmpty = Object.values(profile).every((val) => val === '');
  return (
    <div className="sm:flex sm:justify-center sm:items-center">
      <div className="md:w-full  md:max-w-4xl md:bg-gray-800 md:p-8 md:rounded-lg shadow-md md:border md:border-gray-700">
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
            <p className="text-white font-bold text-[14px]">Logout</p>
          </div>

          <p className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold text-[14px]">
            @johndoe_28
          </p>
        </div>

        <div className="md:flex md:items-start md:gap-6">
          <div className="flex justify-center pt-5">
            <div className="relative rounded-lg  overflow-hidden">
              <Image
                src={profileBg}
                alt="Profile Cover"
                className="object-cover  h-[200px]"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white font-bold text-[16px]">
                  @johndoe_28, <span className="font-normal">28</span>
                </p>
                <p className="text-gray-300 text-[12px]">Male</p>

                <div className="flex gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-black/50 text-white text-[12px] px-2 py-1 rounded-full">
                    ♍ Virgo
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 text-white text-[12px] px-2 py-1 rounded-full">
                    🐖 Pig
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md space-y-4 pt-5">
            {/* About Section */}
            <div className="bg-[#0E191F] p-4 rounded-lg text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">About</h3>
                {isEditAbout ? (
                  <button onClick={handleSaveAbout}>
                    <p className="text-[#F3EDA6]">Save & Update</p>
                  </button>
                ) : (
                  <button onClick={handleAboutEditToggle}>
                    <Image src={pencilIcon} alt="pencil" />
                  </button>
                )}
              </div>

              {isEditAbout ? (
                <div className="space-y-2 mt-4">
                  <input
                    type="text"
                    name="displayName"
                    value={tempProfile.displayName}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Display Name"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={tempProfile.gender}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Gender"
                  />
                  <input
                    type="text"
                    name="birthday"
                    value={tempProfile.birthday}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Birthday"
                  />
                  <input
                    type="text"
                    name="horoscope"
                    value={tempProfile.horoscope}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Horoscope"
                  />
                  <input
                    type="text"
                    name="zodiac"
                    value={tempProfile.zodiac}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Zodiac"
                  />
                  <input
                    type="text"
                    name="height"
                    value={tempProfile.height}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Height"
                  />
                  <input
                    type="text"
                    name="weight"
                    value={tempProfile.weight}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-[#0D1D23] text-white"
                    placeholder="Weight"
                  />
                </div>
              ) : isProfileEmpty ? (
                <p className="py-5 text-gray-400 text-sm">
                  Add in your info to help others know you better.
                </p>
              ) : (
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="text-gray-400">Birthday:</span>{' '}
                    {profile.birthday}
                  </p>
                  <p>
                    <span className="text-gray-400">Horoscope:</span>{' '}
                    {profile.horoscope}
                  </p>
                  <p>
                    <span className="text-gray-400">Zodiac:</span>{' '}
                    {profile.zodiac}
                  </p>
                  <p>
                    <span className="text-gray-400">Height:</span>{' '}
                    {profile.height}
                  </p>
                  <p>
                    <span className="text-gray-400">Weight:</span>{' '}
                    {profile.weight}
                  </p>
                </div>
              )}
            </div>

            {/* Interest Section */}
            <div className="bg-[#0E191F] p-4 rounded-lg text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Interest</h3>
                <button onClick={handleInterestEdit}>
                  <Image src={pencilIcon} alt="pencil" />
                </button>
              </div>

              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#1A2B33] text-white text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="py-5 text-gray-400 text-sm">
                  Add in your interests to help others know you better.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
