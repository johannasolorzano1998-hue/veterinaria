import { createGlobalStyle } from "styled-components";

// estilos globales
const GlobalStyle = createGlobalStyle`
  .actionButtonShow{
    cursor: pointer;
    height: 20px;
    background-color: #28a745;
  }
  .actionButtonEdit{
    cursor: pointer;
    height: 20px;
    background-color: #007bff;
  }
  .actionButtonEdit2{
    cursor: pointer;
    height: 20px;
  }
  .actionButtonDelete{
    cursor: pointer;
    height: 20px;
    background-color: #dc3545;
    color: white;
  }
  .actionButtonDownload{
    cursor: pointer;
    height: 20px;
    width: 25px;
    background-color: #FFA500;
    color: white;
  }
  .dx-treelist-headers .column-soli {
    color: rgb(93, 207, 201);
    font-weight: bold;
  }
  .dx-treelist-headers .column-conta {
    color: rgb(192, 93, 207);
    font-weight: bold;
  }
  .dx-treelist-headers .column-teso {
    color: rgb(209, 122, 36);
    font-weight: bold;
  }
  .dx-treelist-headers .column-finan {
    color: rgb(110, 199, 88);
    font-weight: bold;
  }
  .dx-treelist-headers .bold {
    font-weight: bold;
    font-size: 11px;
  }
`;

export default GlobalStyle;
