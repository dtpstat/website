import NextLink from "next/link";
import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: underline;
`;

interface LinkProps {
  href: string;
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  children,
}) => {
  return (
    <NextLink href={href} passHref={true}>
      <StyledLink>{children}</StyledLink>
    </NextLink>
  );
};
