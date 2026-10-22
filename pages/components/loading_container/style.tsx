import styled from "styled-components";

type GifContainerProps = {
  miniVersion?: boolean;
};

 const GifContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${(props: GifContainerProps) => {
    if (props.miniVersion) return "5%";
    else return "10em";
  }};
`;

export default GifContainer
