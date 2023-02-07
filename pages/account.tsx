import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { images } from "./../assets/logo/images";

import useSubscription from "./../hooks/useSubscription";

import useAuth from "../hooks/useAuth";
import { GetStaticProps } from "next";
import payments from "./../lib/stripe";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import Membership from "../components/Membership";

// declare props type
interface Props {
  products: Product[];
}

function account({ products }: Props) {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);

  return (
    <div>
      <Head>
        <title>Netflix Account Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg=[#141414] pt-0">
        <Link href="/">
          <div className="w-[100px] py-0">
            <Image src={images.logo} alt={""} className="cursor-pointer object-cover" />
          </div>
        </Link>
      </header>

      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10 ">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex">
            {/* svg component, get from netflix */}
            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
              <title>Artboard</title>
              <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Icons/26/clips-Copy">
                  <rect id="BG" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="26" height="26" />
                  <path
                    d="M10.9950284,8 L19.9950284,8 C21.6518827,8 22.9950284,9.34314575 22.9950284,11 L22.9950284,20 C22.9950284,21.6568542 21.6518827,23 19.9950284,23 L10.9950284,23 C9.33817416,23 7.99502841,21.6568542 7.99502841,20 L7.99502841,11 C7.99502841,9.34314575 9.33817416,8 10.9950284,8 Z M10.9950284,10 C10.4427437,10 9.99502841,10.4477153 9.99502841,11 L9.99502841,20 C9.99502841,20.5522847 10.4427437,21 10.9950284,21 L19.9950284,21 C20.5473132,21 20.9950284,20.5522847 20.9950284,20 L20.9950284,11 C20.9950284,10.4477153 20.5473132,10 19.9950284,10 L10.9950284,10 Z M7,16.1734889 L7,18.2207207 C5.72419537,18.0650278 4.64490555,17.094575 4.41012995,15.7630965 L3.02094453,7.88463444 C2.73323481,6.25295153 3.82274035,4.69697637 5.45442326,4.40926665 L13.3279892,3.02094453 C14.9596721,2.73323481 16.5156473,3.82274035 16.803357,5.45442326 L17.0758839,7 L15.0450307,7 L14.8337415,5.80171961 C14.7378383,5.25782531 14.2191799,4.8946568 13.6752856,4.99056004 L5.80171961,6.37888215 C5.25782531,6.47478539 4.8946568,6.99344378 4.99056004,7.53733808 L6.37974546,15.4158001 C6.44252168,15.7718218 6.6864372,16.0504072 7,16.1734889 L7,16.1734889 Z M18.1,15.5 L14.1,17.9 L14.1,13.1 L18.1,15.5 Z"
                    id="Shape"
                    fill="#E50913"
                  />
                </g>
              </g>
            </svg>
            <p>Member since {subscription?.created} </p>
          </div>
        </div>

        {/* membershio__________________________________________________________________ */}
        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0">
          <h4>Plan Details</h4>
          {/* Currrent plan info ___________________________________________________ */}
          <div className="">
            {
              products.filter((product) => {
                return product.id === subscription?.product;
              })[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right"> Change Plan</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p className="col-span-3 cursor-pointer text-blue-500 hover:underline" onClick={logout}>
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default account;
export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
