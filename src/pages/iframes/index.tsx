import { NextPage } from "next";
import * as React from "react";
import styled from "styled-components";

import { Link } from "../../components/link";
import { UserProfile } from "../../components/user-profile";

const PageContainer = styled.div`
  padding: 0 2rem;
`;

const PageTitle = styled.h2`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomePage: NextPage = () => {
  return (
    <PageContainer>
      <Main>
        <PageTitle>DTP-MAP iframes</PageTitle>

        <h3>Menu:</h3>
        <Link href="/iframes/comments/1">Comments</Link>

        <h3>User profile:</h3>
        <UserProfile />
      </Main>
    </PageContainer>
  );
};

export default HomePage;
