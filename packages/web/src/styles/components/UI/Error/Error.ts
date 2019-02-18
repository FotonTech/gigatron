import styled from "styled-components";

const Error = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(254, 0, 0, 0.2);
    border: 1px solid #fe0000;
    border-radius: 4px;

    > h2 {
        font-family: "Inter";
        font-size: 0.8rem;
        font-weight: 400;
        color: #fe0000;
    }
`;

export default Error;
