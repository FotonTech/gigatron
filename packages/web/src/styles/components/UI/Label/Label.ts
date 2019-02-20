import { styled } from "../../../Theme/Theme";

const Label = styled.label`
    align-self: start;
    color: ${props => props.theme.color.label};
    font-family: ${props => props.theme.font.fontFamily};
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
`;

export default Label;
