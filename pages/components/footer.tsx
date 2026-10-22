import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import theme from "../../controllers/styles/theme";

const Footer = () => {
  return (
    <footer className="bg-light w-100 p-2">
      <Container>
        <Row style={{fontSize: "12px"}}>
          <Col md={4} className="text-center">
            <p style={{ color: "#999999", margin: 0 }}>
              &copy; Desarrollado por Sistemas 2022/23
            </p>
          </Col>
          <Col md={4} className="text-center">
            <p className="m-0">
              <a
                href="https://www.grupoancon.com"
                style={{ textDecoration: "none", color: theme.colors.red }}
              >
                www.grupoancon.com
              </a>
            </p>
          </Col>
          <Col md={4} className="text-center">
            <p className="m-0">
              <strong>Version: 2.0</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
