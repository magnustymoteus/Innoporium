import {Form, Container, Button, Alert} from 'react-bootstrap';
import { useEffect } from 'react';
import { GithubLoginButton, DiscordLoginButton } from 'react-social-login-buttons';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Aos from 'aos';

const SignIn = () => {
    const router = useRouter();
    const query = router.query;
    const sInIntegration = (e, service) => {
        e.preventDefault();
        (service!=="credentials")?signIn(service):signIn(service, {email: e.target.email.value, password: e.target.password.value});
    }
    useEffect(() => {
      Aos.init({duration: 1e3});
    });
    return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <Container className="mx-auto bg-light text-dark p-5 rounded form" id="signin" data-aos="fade-left">

    <div className="text-center my-3">
    <h2>Sign In</h2>
    </div>

    <Form method="post" onSubmit={(event) => sInIntegration(event, "credentials")}>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" type="email" placeholder="Enter email" required/>
  </Form.Group>

  <Form.Group controlId="signIn-password">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" placeholder="Password" minLength="7" autoComplete='on' required/>
  </Form.Group>

  <div className="text-center my-4">
  <Button variant="danger" type="submit" className="my-2">Sign In</Button>
  </div>
</Form>
<DiscordLoginButton className="mb-2" onClick={(e) => sInIntegration(e, "discord")}/>
<GithubLoginButton className="mb-2" onClick={(e) => sInIntegration(e, "github")}/>
{query.error && (<Alert variant="danger" className="mt-5">Cannot log in.</Alert>)}
<Link href="/sign-up" passHref><Button variant="light" type="submit" className="mt-3">Don&apos;t have an account?</Button></Link>
</Container>
</div>
    );
}
export default SignIn;