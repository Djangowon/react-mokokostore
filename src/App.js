import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Row, Col, Button } from "react-bootstrap";
import data from "./data.js";
import Product from "./components/Product";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import axios from "axios";
import Cart from "./components/Cart";

function App() {
  const [mokokos, setMokokos] = useState(data);
  const navigate = useNavigate();

  const styledC = {
    flex: "1",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MokokoStore</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main-bg"></div>
              {mokokos && mokokos.length > 0 && (
                <Container style={styledC}>
                  <Row>
                    {mokokos.map((mokoko, index) => {
                      return (
                        <Col
                          key={mokoko.id}
                          onClick={() => {
                            navigate(`/detail/${mokoko.id}`);
                          }}
                        >
                          <Product mokoko={mokoko} />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              )}
              <Button
                // onClick={() => {
                //   axios
                //     .get("http://codingapple1.github.io/shop/data2.json")
                //     .then((data) => {
                //       console.log(mokokos);
                //       console.log(data.data);
                //       // const copy = [...mokokos, ...data.data];
                //       setMokokos(copy);
                //     })
                //     .catch((error) => {
                //       console.log(error);
                //     });
                // }}
                onClick={() => {
                  const copy = [...mokokos, ...mokokos];
                  setMokokos(copy);
                }}
                variant="success"
                size="lg"
              >
                ??? ??????
              </Button>
            </div>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <div>
              <ProductDetail mokokos={mokokos} />
            </div>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>??? ????????? ???????????? ?????????</div>} />
          <Route path="two" element={<div>???????????? ????????????</div>} />
        </Route>

        <Route path="*" element={<div>??????????????????</div>} />
      </Routes>
    </div>
  );
}

export default App;

function Event() {
  return (
    <div>
      <h4>????????? ?????????</h4>
      <Outlet></Outlet>
    </div>
  );
}
