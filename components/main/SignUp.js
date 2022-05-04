import {Form, Container, Button, Col, Row, Alert} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2'
import React, { useState, useEffect } from 'react';
import Aos from 'aos';

const SignUp = (props) => {
  useEffect(() => {
    Aos.init({duration: 1e3});
  });
  const router = useRouter();
  const [registerError, setRegisterError] = useState([false, null]);
  const [canRegister, setCanRegister] = useState(false);
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const validateRegister = () => {
    if(!phone || !date) {setCanRegister(false); return;}
    const phone_valid = new RegExp(phone_regex).test(phone)
    setCanRegister(phone_valid && date.length==10);
  }
  const dateOnChange = (e) => {
    setDate(e.target.value);
    validateRegister();
  }
  const phoneOnChange = (e) => {
    setPhone(e.target.value.replace(/\s/g, ''));
    validateRegister();
  }
  const sUp = async event => {
    event.preventDefault();
    let infoArr = new Array();
    for(let i=0;i<event.target.length-1;i++) {
      infoArr.push(event.target[i].value);
    }
    let info = {
      data: infoArr
    }
    try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    const result = await res.json();
    if(result.code==="success") router.push("/sign-in");
    else if(result.code==="error") setRegisterError([true, result.message]); 
    } catch(error) {
      console.log(error);
    }
  }
    return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <Container className="mx-auto bg-light text-dark p-4 rounded mt-4 form" id="signup" data-aos="fade-right">

    <div className="text-center my-3">
    {(!props.title)?(<h2>Sign Up</h2>):(<h2>{props.title}</h2>)}
    </div>

    <Form onSubmit={sUp} method="post">
    {(props.nonNative) && (<p className="text-center">As non-native user, completing your profile grants you shopping access.</p>)}
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" name="firstname" required/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="secondName">
          <Form.Label>Second Name</Form.Label>
          <Form.Control type="text" placeholder="Enter second name" name="secondname" required/>
          </Form.Group>
        </Col>
      </Row>
  {
  (!props.nonNative) &&(
    <React.Fragment>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name="email" required/>
  </Form.Group>
  
  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password" minLength="7" autoComplete="on" required/>
  </Form.Group>
  </React.Fragment>
  )
  }
  <Form.Group className="mb-3" controlId="gender">
   <Form.Label>Gender</Form.Label>
  <Form.Select name="gender" required>
    <option>Male</option>
    <option>Female</option>
  </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" controlId="birthdate">
    <Form.Label>Birthdate</Form.Label>
    <Form.Control type="date" placeholder="Birthdate" name="birthdate" onChange={(e) => dateOnChange(e)} required/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="phonenumber">
   <Form.Label>Phone number</Form.Label>
   <PhoneInput inputProps={{name:"phonenumber", required: true, minLength: 11, onChange: (e) => phoneOnChange(e)}} value={phone} country={'be'}/>
  </Form.Group>

  <Row>
    <Col>
  <Form.Group className="mb-3" controlId="street">
    <Form.Label>Street</Form.Label>
    <Form.Control type="text" placeholder="Street" name="street" required/>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="housenumber">
    <Form.Label>House Number</Form.Label>
    <Form.Control type="number" placeholder="House" name="housenumber" min="1" required/>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="postcode">
    <Form.Label>Postal code</Form.Label>
    <Form.Control type="number" placeholder="Postcode" name="postcode" min="1" required/>
  </Form.Group>
  </Col>
  </Row>
  <div className="text-center my-4">
  <Button variant="danger" type="submit" className="my-2" disabled={!canRegister}>{(!props.title)?"Create Account":props.title}</Button>
  </div>
</Form>
{registerError[0] && (<Alert variant="danger">Cannot {(!props.nonNative)?"register":props.title} {registerError[1]}</Alert>)}
{(!props.hideAHABtn)&&(<Link href="/sign-in" passHref><Button variant="light" type="submit">Already have an account?</Button></Link>)}
</Container>
</div>
    );
}
export default SignUp;