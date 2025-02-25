'use client';
import React, { useState } from 'react';
import arrow from '../../../public/images/icons/back-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import Link from 'next/link';
import Swal from 'sweetalert2';
// import { loginFunction } from '@/service/AuthService';

const Login = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // const [form, setForm] = useState({ email: '', username: '', password: '' });
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await loginFunction(form);
  //     localStorage.setItem('token', res.access_token);
  //     Swal.fire('Success', res.message, 'success');
  //     console.log(res.access_token);
  //     router.push('/Home');
  //   } catch (error: any) {
  //     Swal.fire(
  //       'Error',
  //       error.response?.data?.message || 'Login failed',
  //       'error'
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // dummy data
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isLoading(true);
    setTimeout(() => {
      if (form.email === 'test@gmail.com' && form.password === 'password123') {
        const fakeToken = 'fake-jwt-token';
        localStorage.setItem('token', fakeToken);
        Swal.fire('Success', 'Login successful!', 'success');
        router.push('/Home');
      } else {
        Swal.fire('Error', 'Invalid email or password', 'error');
      }
      isLoading(false);
    }, 1000);
  };
  return (
    <div className="md:flex md:justify-center md:items-center">
      <div className=" md:w-full md:max-w-md lg:max-w-lg lg:bg-gray-800 md:p-8 md:rounded-lg shadow-md lg:border lg:border-gray-700">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={arrow}
            alt="backarrow"
            width={7}
            height={14}
            onClick={handleBack}
          />
          <p className="text-white font-bold text-[14px]">Back</p>
        </div>
        <div className="flex-1 pt-10 ">
          <h1 className="text-white font-bold text-[24px]">Login</h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <InputForm
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* <InputForm
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          /> */}

            <InputForm
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              showToggleIcon
              required
            />
            <Button disabled={loading} type="submit">
              {loading ? 'Proses...' : 'Login'}
            </Button>
          </form>
          <div className="text-center mt-5">
            <p className="">
              No Account?{' '}
              <Link href={'/register'}>
                <span className="text-[#F3EDA6] underline">Register Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
