// import Head from "next/head";
import * as React from "react";

import { Map } from "../components/Map/Map";
// import { Link } from "../components/link";
// import { UserProfile } from "../components/user-profile";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      {/* <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
        </Head>
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
