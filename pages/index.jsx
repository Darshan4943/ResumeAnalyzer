import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";

import jwt from "jsonwebtoken";
import HeroSection from "~/components/featured/home/HeroSection";
import HomePage from "./home/Home";

function Home() {


  return (
    <>

      <main>
        <HomePage />
      </main>
    </>
  );
}

export default Home;
