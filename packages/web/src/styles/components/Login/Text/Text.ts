import styled from "styled-components";

const Text = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px 0 30px;
    font-size: 0.8rem;

    > h3 {
        font-family: "Inter";
        font-size: 0.8rem;
        font-weight: 500;
        color: #811cfc;
    }
`;

export default Text;
