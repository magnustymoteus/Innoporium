import React, {useEffect, useState, useCallback} from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {Card, Container, Row, Col} from 'react-bootstrap';

const Cart = () => {
    let [items, setItems] = useState();
    let [total, setTotal] = useState();
    const {data: session} = useSession();
    const deleteFromWishlist = useCallback(async(productIdArg, actionArg) => {
      try {
        const res = await fetch('/api/manage-wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({clientID: session.user.account_id, productID: productIdArg, crud: actionArg}),
        });
        const result = await res.json();
        if(result.code !== "success") throw result.code;
      }
      catch(error) {
        console.log(error);
      }
      }, [session]);
    const renderWishlist = useCallback(async() => {
      try {
        const res = await fetch(`api/get-wishlist`);
        const result = await res.json();
          if(result.code == "success") {
            var items = result.items;
            setTotal(result.total);
        } else {
          throw result.code;
        }
        if(result.items) {
        let elements = new Array();
        for(let [index, item] of items.entries()) {
          let child = new Array(
            <div className="d-flex justify-content-between" key={`item-${index}`}>
              <div className="d-flex flex-row align-items-center">
                  <div>
                  <Image src="https://via.placeholder.com/75x75" alt="50x50" width="75px" height="75px"></Image>
                </div>
                <div className="ms-3">
                        <h5>{item.name} ({item.id})</h5>
                        <p className="small mb-0">{item.description}</p>
                        </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                        <div className="div-01">
                        <small className="fw-normal mb-0">{item.amount}x</small>
                        </div>
                        <div className="div-02 w-100">
                        <small className="mb-0 ubit">U {item.price*item.amount}</small>
                      </div>
                    <button onClick={() => deleteFromWishlist(item.id, "delete")}><small className="fas fa-trash-alt"></small></button>
                  </div>
                </div>
          );
          let parent = (<Card key={`card-${index}`}><Card.Body>{child}</Card.Body></Card>);
          elements.push(parent);
        }
        setItems(elements);
        }
      }
      catch(error) {
        console.log(error);
      }
    }, [deleteFromWishlist]);
    useEffect(() => {
        if(session) {
          renderWishlist();
        }
      }, [session, renderWishlist]);
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
                          <p className="mb-0">{(items)?`You have ${items.length} different items in your cart`:"You don't have any items in your cart."}</p>
                        </div>
                      </div>
                      {items}
                    </Col>
                    <Col lg={5}>
                      <Card className="bg-danger text-white rounded-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2 ubit">{(items)?`U ${total}`:'...'}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2 ubit">{(items)?`U ${parseFloat((total*0.15).toFixed(2))} (15%)`:'...'}</p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2 ubit">{(items)?`U ${parseFloat(((total+(total*0.15)).toFixed(2)))}`:'...'}</p>
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