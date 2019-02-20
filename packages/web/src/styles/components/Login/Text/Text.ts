import { styled } from "../../../Theme/Theme";

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
        font-family: ${props => props.theme.font.fontFamily};
        font-size: 0.8rem;
        font-weight: 500;
        color: ${props => props.theme.color.primary};
    }
`;

export default Text;
