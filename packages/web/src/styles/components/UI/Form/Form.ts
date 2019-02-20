import { styled } from "../../../Theme/Theme";

interface FormProps {
    width?: number;
    height?: number;
    gridColumn?: string;
    gridRow?: string;
    backgroundColor?: string;
}

const Form = styled.form<FormProps>`
    width: ${props => props.width || 100}%;
    max-width: 420px;
    height: ${props => props.height || 80}%;
    grid-column: ${props => props.gridColumn || ""};
    grid-row: ${props => props.gridRow || ""};
    background-color: ${props =>
        props.backgroundColor || props.theme.color.secondary};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    align-self: start;
`;

export default Form;
