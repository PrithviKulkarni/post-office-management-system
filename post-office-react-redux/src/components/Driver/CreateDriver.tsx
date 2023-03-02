import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { Driver, defaultDriver } from "../interfaces/driverinterface";
import { addNewDriver } from "../../features/DriverSlice";
import { useAppDispatch } from "../../app/hooks";

const CreateDriver = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fname, setFirstname] = useState<string>("");
  const [lname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fnameVal, setFirstnameVal] = useState<boolean>(false);
  const [lnameVal, setLastnameVal] = useState<boolean>(false);
  const [usernameVal, setUsernameVal] = useState<boolean>(false);
  const [emailVal, setEmailVal] = useState<boolean>(false);
  const [passwordVal, setPasswordVal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * *
   * handles the submit for confirmation and sends a post or patch request to the mongoDB.
   *
   *  @returns post request Drivers. */

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const validated = [fname, lname, username, email, password].every(Boolean);
    try {
      if (!fname) {
        setFirstnameVal(true);
      } else {
        setFirstnameVal(false);
      }
      if (!lname) {
        setLastnameVal(true);
      } else {
        setLastnameVal(false);
      }
      if (!username) {
        setUsernameVal(true);
      } else {
        setUsernameVal(false);
      }
      if (!email) {
        setEmailVal(true);
      } else {
        setEmailVal(false);
      }
      if (!password) {
        setPasswordVal(true);
      } else {
        setPasswordVal(false);
      }

      if (validated) {
        const newDriver: Driver = defaultDriver;

        if (fname) {
          newDriver.first_name = fname;
        }
        if (lname) {
          newDriver.last_name = lname;
        }
        if (username) {
          newDriver.username = username;
        }
        if (email) {
          newDriver.email = email;
        }
        if (password) {
          newDriver.password = password;
        }

        console.log({ newDriver });

        dispatch(addNewDriver(newDriver));
        navigate("/drivers");
      }
    } catch (error) {
      setErrorMessage("Player NOT FOUND.");
      console.log("errorMessage: ", errorMessage);
    }
  };

  /**
   * *
   * Returns submitted information.
   *
   *  @returns Players Games. */

  return (
    <div className="create-driver" data-testid="create-driver-test">
      <Container>
        <Form
          onSubmit={submitHandler}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          className="create-driver-form"
          data-testid="create-driver-form"
        >
          <InputGroup>
            <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
            <Form.Control
              type="text"
              className="fname"
              data-testid="create-driver-fname"
              aria-label="fname"
              aria-describedby="basic-addon1"
              size="sm"
              name="fname"
              value={fname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            {fnameVal && (
              <Form.Text className="text-muted" data-testid="firstNameVal">
                Please fill in field
              </Form.Text>
            )}
          </InputGroup>

          <InputGroup>
            <InputGroup.Text id="basic-addon1">Last name</InputGroup.Text>
            <Form.Control
              type="text"
              className="lname"
              data-testid="create-driver-lname"
              aria-label="lname"
              aria-describedby="basic-addon1"
              size="sm"
              name="lname"
              value={lname}
              onChange={(event) => setLastname(event.target.value)}
            />
            {lnameVal && (
              <Form.Text className="text-muted" data-testid="lastNameVal">
                Please fill in field
              </Form.Text>
            )}
          </InputGroup>

          <InputGroup>
            <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
            <Form.Control
              type="text"
              aria-label="username"
              className="username"
              data-testid="create-driver-username"
              aria-describedby="basic-addon1"
              size="sm"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {usernameVal && (
              <Form.Text className="text-muted" data-testid="usernameVal">
                Please fill in field
              </Form.Text>
            )}
          </InputGroup>

          <InputGroup>
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              type="text"
              aria-label="email"
              className="email"
              data-testid="create-driver-email"
              aria-describedby="basic-addon1"
              size="sm"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailVal && (
              <Form.Text className="text-muted" data-testid="emailVal">
                Please fill in field
              </Form.Text>
            )}
          </InputGroup>

          <InputGroup>
            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            <Form.Control
              type="text"
              aria-label="password"
              className="password"
              data-testid="create-driver-password"
              aria-describedby="basic-addon1"
              size="sm"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordVal && (
              <Form.Text className="text-muted" data-testid="passwordVal">
                Please fill in field
              </Form.Text>
            )}
          </InputGroup>
          <Button type="submit" data-testid="driver-create-button">
            Submit
          </Button>
          <p>{errorMessage}</p>
        </Form>
      </Container>
    </div>
  );
};

export default CreateDriver;
