import Head from "next/head";
import React, { useState } from "react";
import { images } from "./../assets/logo/images";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { CheckIcon } from "@heroicons/react/solid";

import { Product } from "@stripe/firestore-stripe-payments";
import Table from "./Table";
import Loader from "./Loader";
import { loadCheckout } from "../lib/stripe";

interface Props {
  products: Product[];
}

function Plans({ products }: Props) {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setBillingloading] = useState(false);
  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id!);
    setBillingloading(true);
  };
  return (
    <div>
      <Head>
        <title>Netflix plan</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <header className="py-0 border border-white/10 bg-[#141414] ">
        <Link href="/">
          <Image
            src={images.logo}
            alt={""}
            className="cursor-pointer w-28 mt-0"
            priority={true}
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign out
        </button>
      </header>
      <main className="pt-28 px-5 pd-12 max-w-5xl mx-auto transition-all md:px-10 ">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products &&
              products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="planBox"
                    onClick={() => {
                      setSelectedPlan(product);
                    }}
                  >
                    <p>{product.name}</p>
                  </div>
                );
              })}
          </div>
          {/* Table for the plan  */}
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
