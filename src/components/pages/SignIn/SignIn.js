import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignIn.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getUsername = (event) => {
    setUsername(event.target.value);
  };

  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const Login = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/signIn",
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      if (res.data.user.isAdmin) {
        navigate("/admin");
      } else if (!res.data.user.isAdmin) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/myOrders");
      }
      window.location.reload();
    });
  };

  return (
    <div className="signIn-form">
      <Form onSubmit={(event) => Login(event)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={getUsername} type="text" placeholder="Nazwa uytkownika" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control onChange={getPassword} type="password" placeholder="Hasło" />
        </Form.Group>
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
