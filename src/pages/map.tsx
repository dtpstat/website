import Script from "next/script";
import * as React from "react";

import { Map } from "../components/Map/Map";

export default function Home() {
  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ad7c40a7-7096-43c9-b6e2-5e1f6d06b9ec&lang=ru_RU"
        strategy="beforeInteractive"
      />
      <Map />
    </>
  );
}
