import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { server } from '../../lib/server';
import Image from "next/image";
import {Card, Container, Row, Col} from 'react-bootstrap';

const Cart = () => {
    let [items, setItems] = useState(null);
    const renderWishlist = async(items) => {
      try {
        let elements = new Array();
        for(let [index, item] of items.entries()) {
          let child = new Array(
            <div className="d-flex justify-content-between" key={`item-${index}`}>
              <div className="d-flex flex-row align-items-center">
                  <div>
                  <Image src="https://via.placeholder.com/75x75" alt="50x50" width="75px" height="75px"></Image>
                </div>
                <div className="ms-3">
                        <h5>{item.name}</h5>
                        <p className="small mb-0">{item.description}</p>
                        </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                        <div className="div-01">
                        <h5 className="fw-normal mb-0">2</h5>
                        </div>
                        <div className="div-02 w-100">
                        <h5 className="mb-0">$900</h5>
                      </div>
                    <a href="#!" className="a-01"><i className="fas fa-trash-alt"></i></a>
                  </div>
                </div>
          );
          let parent = (<Card key={`card-${index}`}><Card.Body>{child}</Card.Body></Card>);
          elements.push(parent);
        }
        setItems(elements);
      }
      catch(error) {
        console.log(error);
      }
    }
    const getWishlistItems = async() => {
      try {
        const res = await fetch(`${server}/api/get-wishlist`);
        const result = await res.json();
          if(result.code == "success") {
            return result.items;
        }
    }
    catch(error) {
        console.log(error);
    }
    }
    const makeWishlist = async() => {
      const items = await getWishlistItems();
      renderWishlist(items);
    }
    const {data: session} = useSession();
    useEffect(() => {
        if(session) {
        makeWishlist();
      }
    });
    return (
        <section className="h-100 h-custom">
        <Container className="h-100 text-dark py-5">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col>
              <Card>
                <Card.Body className="p-5">
                  <Row>
                    <Col lg={7}>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h1 className="mb-1">Shopping cart</h1>
                          <p className="mb-0">You have 4 items in your cart</p>
                        </div>
                      </div>
                      {items}
                    </Col>
                    <Col lg={5}>
                      <Card className="bg-danger text-white rounded-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">$4798.00</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">$4818.00</p>
                          </div>
                          <button type="button" className="btn btn-light btn-block btn-lg btn-checkout">
                            <div className="d-flex justify-content-between">
                              <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </div>
                          </button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
      
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
}
export default Cart;