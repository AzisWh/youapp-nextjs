'use client';
import React, { useState } from 'react';
import arrow from '../../../public/images/icons/back-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { loginFunction } from '@/service/AuthService';

const Login = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginFunction(form);
      localStorage.setItem('token', res.access_token);
      Swal.fire('Success', res.message, 'success');
      console.log(res.access_token);
      router.push('/Home');
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Login failed',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <div className="flex flex-row gap-2">
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

          <InputForm
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <InputForm
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            showToggleIcon
            required
          />
          <Button type="submit" isLoading={isLoading}>
            Login
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
  );
};

export default Login;
