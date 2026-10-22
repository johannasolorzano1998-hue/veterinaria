import styled from 'styled-components'

const PdfContainer = styled.div`
@page {
  size: 297mm 210mm;
}

@media all {
  .pagebreak {
    display: none;
  }
}

@media print {
  .pagebreak {
    page-break-before: always;
  }
}
`

export default PdfContainer