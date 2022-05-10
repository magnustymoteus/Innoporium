import React, {useState, useEffect} from "react";
import {Table, Container, Popover, OverlayTrigger, Button} from 'react-bootstrap';
import { server } from '../../lib/server';
import { useSession } from "next-auth/react";

const Users = () => {
    const [TBody, setTBody] = useState(null);
    const commitTable = async() => {
      try {
          const res = await fetch(`${server}/api/get-users`);
          const result = await res.json();
            if(result.code == "success") {
                let TBodyObject = result.users.map(
                    (info, index) => {
                        return (
                          <OverlayTrigger trigger="click" placement="top" overlay={popoverInit(`${info.firstName} ${info.secondName}`, info.id, info.admin)} key={"tr-"+index} rootClose>
                            <tr>
                                <td>{info.type[0].toUpperCase()+info.type.slice(1,info.type.length)}</td>
                                <td>{info.admin}</td>
                                <td>{info.email}</td>
                                <td>{info.firstName}</td>
                                <td>{info.secondName}</td>
                                <td>{info.gender}</td>
                                <td>{info.birthDate.substring(0,10)}</td>
                                <td>{info.phoneNumber}</td>
                                <td>{info.streetName}</td>
                                <td>{info.houseNumber}</td>
                                <td>{info.postCode}</td>
                                <td>{info.ubits}</td>
                            </tr>
                            </OverlayTrigger>
                        )});
                        setTBody(TBodyObject);
          }
      }
      catch(error) {
          console.log(error);
      }
  }
    const changeUser = async(crudArg, clientArg, valueArg) => {
      try {
      const res = await fetch('/api/change-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({crud: crudArg, value: valueArg, client: clientArg}),
      });
      const result = await res.json();
      if(result.code === "success") commitTable();
      }
      catch(error) {
          console.log(error);
      }
    }
    const popoverInit = (name, id, admin) => {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3" className="text-dark">Manage {name}</Popover.Header>
          <Popover.Body>
              <div className="text-center">
            {
            (!admin)?(<Button variant="warning" onClick={() => changeUser("update", id, 1)} className="m-1">Make Admin</Button>):(<Button variant="warning" onClick={() => changeUser("update", id, 0)}>Make User</Button>)
            }
            {(!admin) && (<Button variant="danger" onClick={() => changeUser("delete", id)} className="m-1">Delete User</Button>)}
            </div>
          </Popover.Body>
        </Popover>
      );
      return popover;
    }
    const {data: session} = useSession();
    useEffect(() => {
        if(session) {
        commitTable();
        }
    });
    return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <Container className="mx-auto bg-light text-dark p-5 rounded" data-aos="fade-down" fluid>  
    <h1 className="mb-5">Users</h1>  
    <Table striped bordered hover size="sm" variant="light" responsive>
    <thead>
    <tr>
      <th>Account</th>
      <th>Admin</th>
      <th>Email</th>
      <th>First Name</th>
      <th>Second Name</th>
      <th>Gender</th>
      <th>Birth Date</th>
      <th>Phone Number</th>
      <th>Street Name</th>
      <th>House Number</th>
      <th>Postal Code</th>
      <th>Ubits</th>
    </tr>
  </thead>
  <tbody>
    {TBody}
  </tbody>
            </Table>
      </Container>
      </div>
    );
}
export default Users;