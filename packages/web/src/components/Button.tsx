import React from "react";
import styled from "styled-components";

const Button = styled.div`
    font-size: 35px;
    background: #3f5efb;
    border-width: 0;
    color: white;
    text-align: center;
    font-weight: 900;
    border-radius: 50px;
    padding: 10px 25px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
`;

export default ({ text, ...rest }: any) => <Button {...rest}>{text}</Button>;
