import NextLink from "next/link";
import * as React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: underline;
`;

interface LinkProps
  extends Omit<React.HTMLProps<HTMLAnchorElement>, "as" | "ref"> {
  href: string;
  children?: React.ReactNode;
}

export const Link: React.VoidFunctionComponent<LinkProps> = ({
  href,
  children,
  ...rest
}) => {
  return (
    <NextLink href={href} passHref={true}>
      <StyledLink {...rest}>{children}</StyledLink>
    </NextLink>
  );
};
