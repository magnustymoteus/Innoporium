import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {Card, Container, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'

const Cart = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [items, setItems] = useState();
    const [products, setProducts] = useState();
    const [total, setTotal] = useState();
    const [isMounted, setIsMounted] = useState(false);
    const [ubits, setUbits] = useState();
    const checkout = async() => {
      try {
        const res = await fetch('/api/manage-wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ubits: ubits, crud: "checkout", totalPrice: parseFloat(total+(total*0.15)).toFixed(2), products: products}),
        });
        const result = await res.json();
        if(result.code === "success") {
            router.reload();
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    const getUbits = async() => {
        try {
          const res = await fetch("/api/get-client");
          const result = await res.json();
          if(result.code === "success") {
            setUbits(parseFloat(result.user.ubits));
          }
        }
        catch(error) {
          console.log(error);
        }
    }
    const deleteFromWishlist = async(productIdArg) => {
      try {
        const res = await fetch('/api/manage-wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({clientID: session.user.account_id, productID: productIdArg, crud: "delete"}),
        });
        const result = await res.json();
        if(result.code === "success") {
            renderWishlist();
        }
      }
      catch(error) {
        console.log(error);
      }
      }
    const renderWishlist = async() => {
      try {
        const res = await fetch(`api/get-wishlist`);
        const result = await res.json();
          if(result.code === "success") {
            var items = result.items;
            setProducts(items);
            setTotal(result.total);
            getUbits();
        }
        if(result.items) {
        let elements = items.map((item, index) => {
          return (
          <Card key={`card-${index}`}>
          <Card.Body>
          <div className="d-flex justify-content-between" key={`item-${index}`}>
          <div className="d-flex flex-row align-items-center">
              <div>
              {(item.image)?<Image src={item.image} alt={`item-image${item.image}`} className="cart-image" width="126px" height="100px"></Image>:<></>}
            </div>
            <div className="ms-3">
                    <h5>{item.name}</h5>
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
                <button className={`button-item${item.id}`} onClick={() => deleteFromWishlist(item.id)}><small className="fas fa-trash-alt"></small></button>
              </div>
            </div>
            </Card.Body>
            </Card>)
        });
        setItems(elements);
        }
        else {
          setItems();
          setTotal();
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    useEffect(() => {
        if(session && !isMounted) {
          renderWishlist().then(() => {setIsMounted(true);});
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
                          {
                          (items)?
                          <button type="button" className="btn btn-light btn-block btn-lg btn-checkout" onClick={() => checkout()}  disabled={(parseFloat(((total+(total*0.15)).toFixed(2)))>ubits)}>
                            <div className="d-flex justify-content-between">
                              <span>{
                              (parseFloat(((total+(total*0.15)).toFixed(2)))>ubits)?
                              <small>Not Enough Ubits</small>
                              :
                              (<React.Fragment>
                                <small>Checkout</small><i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </React.Fragment>)
                              }</span>
                            </div>
                          </button>
                          : <></>
                          }
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