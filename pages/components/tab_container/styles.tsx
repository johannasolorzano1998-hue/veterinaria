import styled from "styled-components";
import theme from "../../../controllers/styles/theme";

 const NavStyler = styled.div`
  .nav-link{
    color: ${theme.colors.grey};
    cursor: pointer;
  }
  .active{
    color: blue !important;
  }
`

export default NavStyler