import NextLink from "next/link";
import * as React from "react";
import styled from "styled-components";

export const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

interface LinkProps {
  href: string;
  children?: React.ReactNode;
}

export const Link: React.VoidFunctionComponent<LinkProps> = ({
  href,
  children,
}) => {
  return (
    <NextLink href={href} passHref={true}>
      <StyledLink>{children}</StyledLink>
    </NextLink>
  );
};
