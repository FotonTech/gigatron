import styled from "styled-components";

const StyledLogin = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 140px 50px 1fr;
    background-color: white;
    align-items: center;
    justify-items: center;

    a {
        font-family: "Inter";
        font-size: 0.8rem;
        font-weight: 500;
        color: #811CFC;
        text-decoration: none;
    }
`;

export default StyledLogin;
