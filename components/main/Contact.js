import React, {useEffect} from 'react';
import {Container, Form, Row, Button} from 'react-bootstrap';
import Aos from 'aos';
const Contact = () => {
    useEffect(() => {
        Aos.init({duration: 1e3});
      });
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" data-aos="fade-up">
            <Container className="mx-auto bg-light text-dark p-5 rounded form" id="contact-form">
                <h2 className="text-center mb-3">Contact Us</h2>
                <Form action="https://formsubmit.co/4faea7dff03a640f187d4d861e0dc8b9" target="_blank" method="POST">
                <Row>
                <Form.Group className="mb-3 mx-auto col">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3 mx-auto col">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>
                </Row>
                <Form.Group className="mb-3 mx-auto col">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" placeholder="Enter message" rows={3} />
                </Form.Group>
                <div className="text-center my-4">
                <Button variant="danger" type="submit" className="my-2">Submit</Button>
                </div>
                </Form>
            </Container>
            </div>
    );
}
export default Contact;