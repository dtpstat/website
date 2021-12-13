import { inject, observer } from "mobx-react";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import styled from "styled-components";

import { RootStore } from "../stores";

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: #18334a;
  mix-blend-mode: normal;
  border: none;
  background: none;
  width: 100%;
`;

interface TextInputProps {
  placeholder: string;
  rootStore?: RootStore;
}

export const TextInputComponent: React.VoidFunctionComponent<
  TextInputProps
> = ({ placeholder, rootStore }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) =>
    (rootStore!.commentStore.newComment = event.target.textContent ?? "");

  return <StyledInput placeholder={placeholder} onChange={onChange} />;
};

export const TextInput = inject(RootStore.storeName)(
  observer(TextInputComponent),
);
