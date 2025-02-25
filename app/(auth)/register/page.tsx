'use client';
import React, { useState } from 'react';
import arrow from '../../../public/images/icons/back-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import Link from 'next/link';
import { register } from '@/service/AuthService';
import Swal from 'sweetalert2';

const Register = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      Swal.fire('Error', 'Password and Confirm Password do not match', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const { email, username, password } = form;
      const res = await register({ email, username, password });

      Swal.fire('Success', res.message, 'success');
      router.push('/login');
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Registration failed',
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
        <h1 className="text-white font-bold text-[24px]">Register</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <InputForm
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={form.email}
            required
          />

          <InputForm
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            value={form.username}
            required
          />

          <InputForm
            name="password"
            type="password"
            placeholder="Create Password"
            showToggleIcon
            onChange={handleChange}
            value={form.password}
            required
          />

          <InputForm
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            showToggleIcon
            onChange={handleChange}
            value={form.confirmPassword}
            required
          />
          <Button
            type="submit"
            variant="primary"
            onClick={() => router.push('/Home')}>
            Register
          </Button>
        </form>
        <div className="text-center mt-5">
          <p className="">
            Have an Account?{' '}
            <Link href={'/login'}>
              <span className="text-[#F3EDA6] underline">Login Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
