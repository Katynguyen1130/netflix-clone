import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { images } from "../assets/logo/images";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function login() {
  const [login, setLogin] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix Log in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={images.loginbackground}
        alt={""}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline "
        objectFit="cover"
      />
      <Image
        src={images.logo}
        alt={""}
        className="absolute top-0 left-0 cursor-pointer object-contain  "
        width={150}
        height={150}
      />
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:bt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>
        <div>
          <p className="inline-block mr-1 text-[gray]">New to Netflix? </p>
          <button
            type="submit"
            className=" text-white hover:underline "
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default login;
