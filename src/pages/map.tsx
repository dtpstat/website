import Script from "next/script";
import * as React from "react";

import { Map } from "../components/Map/Map";
// import { Link } from "../components/link";
// import { UserProfile } from "../components/user-profile";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ad7c40a7-7096-43c9-b6e2-5e1f6d06b9ec&lang=ru_RU"
        strategy="beforeInteractive"
      />
      {/* <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.title}>Welcome to DTP-MAP</h2>

          <h3>Menu:</h3>
          <Link href="/iframes/comments/1">Comments</Link>

          <h3>User profile:</h3>
          <UserProfile />
        </main>
      </div> */}
      <Map />
    </>
  );
}
