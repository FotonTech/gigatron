import React from "react";
import styled from "styled-components";

const Input = styled.input`
    font-size: 45px;
    background: transparent;
    border-width: 0;
    color: white;
    text-align: center;
    font-family: "Inter Medium";
    font-weight: 700;
    ::placeholder {
        color: white;
    }
`;

export default ({ ...rest }) => <Input {...rest} />;
