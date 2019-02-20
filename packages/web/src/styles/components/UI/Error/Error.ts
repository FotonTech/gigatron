import { styled } from "../../../Theme/Theme";

const Error = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.error.bgColor};
    border: ${props => props.theme.error.border};
    border-radius: 4px;

    > h2 {
        font-family: ${props => props.theme.font.fontFamily};
        font-size: 0.8rem;
        font-weight: 400;
        color: ${props => props.theme.error.color};
    }
`;

export default Error;
