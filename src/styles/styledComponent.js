"use client";
import styled from "styled-components";

export const Text = styled.p((props) => ({
  fontSize: props.$size || "16px",
  fontWeight: props.$fontWeight || 400,
  textAlign: props.$textAlign || "left",
  color: props.$color || "var(--globalGrey)",
  lineHeight: props.$lineHeight || "24px",
  margin: 0,
  "@media (max-width: 600px)": {
    fontSize: "14px",
    lineHeight: "21px",
  },
}));

export const PageTitle = styled.h1((props) => ({
  fontSize: props.$size || "36px",
  fontWeight: 600,
  textAlign: props.$textAlign || "left",
  lineHeight: props.$lineHeight || "60px",
  color: props.$color || "var(--globalBlack)",
  margin: 0,
  "@media (max-width: 600px)": {
    fontSize: "20px",
    lineHeight: "35px",
  },
}));

export const SectionTitle = styled.h2((props) => ({
  fontSize: props.$size || "32px",
  fontWeight: 600,
  textAlign: props.$textAlign || "left",
  color: props.$color || "var(--globalBlack)",
  lineHeight: props.$lineHeight || "42px",
  margin: 0,
  letterSpacing: "-2%",
  "@media (max-width: 990px)": {
    lineHeight: "45px",
  },
  "@media (max-width: 600px)": {
    fontSize: "20px",
    lineHeight: "24px",
  },
}));

export const Input = styled.input((props) => ({
  fontSize: props.$size || "16px",
  fontWeight: 400,
  color: props.$color || "#344054",
  lineHeight: props.$lineHeight || "24px",
  margin: 0,
  borderRadius: "4px",
  border: `1px solid ${props.error ? "var(--globalRed)" : "#D0D5DD"}`,
  padding: "12px 16px",
  flex: 1,
  "@media (max-width: 600px)": {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

export const Select = styled.select((props) => ({
  fontSize: props.$size || "16px",
  fontWeight: 400,
  color: props.$color || "#344054",
  lineHeight: props.$lineHeight || "24px",
  margin: 0,
  border: "1px solid #D0D5DD",
  borderRadius: "4px",
  padding: "12px 16px",
  "@media (max-width: 600px)": {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

export const RadioImageButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  border: ${(props) =>
    props.checked ? "2px solid #283487" : "2px solid transparent"};
  border-radius: 8px;
  padding: 10px;
  width: 128px;
  height: 144px;
  background-color: #fff;
  box-shadow: 0px 4px 4px 0px #0000000d;

  input {
    display: none;
  }

  .radioCircle {
    width: 100%;
    text-align: right;
  }

  .radioCircle span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: ${(props) =>
      props.checked ? "2px solid #2B8E44" : "2px solid #344054"};
    background-color: ${(props) => (props.checked ? "#2B8E44" : "#fff")};
    display: inline-block;
    position: relative;
  }

  .radioCircle span:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .icon {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }

  .label {
    font-size: 14px;
    line-height: 21px;
    font-weight: ${(props) => (props.checked ? "600" : "400")};
    text-align: center;
  }
`;

export const RadioTextButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  border: ${(props) =>
    props.checked ? "1px solid #283487" : "1px solid #D0D5DD"};
  border-radius: 4px;
  padding: 12px 16px;
  background-color: #fff;

  input {
    display: none;
  }

  .innerLabel {
    width: 100%;
  }

  .innerLabel p {
    color: #475467;
    font-size: 12px;
    line-height: 18px;
  }

  .radioCircle {
    text-align: right;
  }

  .radioCircle span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: ${(props) =>
      props.checked ? "2px solid #2B8E44" : "2px solid #344054"};
    background-color: ${(props) => (props.checked ? "#2B8E44" : "#fff")};
    display: inline-block;
    position: relative;
  }

  .radioCircle span:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .label {
    font-size: 14px;
    line-height: 21px;
    width: 100%;
    font-weight: ${(props) => (props.checked ? "600" : "400")};
  }
`;

export const LinkText = styled.a((props) => ({
  color: props.$color || "var(--secondaryColor)",
  fontSize: props.$size || "16px",
  fontWeight: props.$fontWeight || 500,
  cursor: "pointer",
  "@media (max-width: 600px)": {
    fontSize: "12px",
    lineHeight: "19.2px",
  },
}));
