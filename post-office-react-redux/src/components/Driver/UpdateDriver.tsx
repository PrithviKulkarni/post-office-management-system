import { useState, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { Driver, defaultDriver } from '../interfaces/driverinterface';
import { updateADriver, getDriverById } from '../../features/DriverSlice';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';

const UpdateDriver = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();
    const Driver = useSelector((state: RootState) => getDriverById(state, params.driverId!));

    // const [fname, setFirstname] = useState<string  | undefined>(Driver?.first_name);
    // const [lname, setLastname] = useState<string  | undefined>(Driver?.last_name);
    // const [email, setEmail] = useState<string  | undefined>(Driver?.email);
    // const [fname, setFirstname] = useState<string | undefined>(Driver?.first_name);
    // const [lname, setLastname] = useState<string | undefined>(Driver?.last_name);
    // const [email, setEmail] = useState<string | undefined>(Driver?.email);
    const [fname, setFirstname] = useState<string | undefined>(Driver?.first_name);
    const [lname, setLastname] = useState<string | undefined>(Driver?.last_name);
    const [email, setEmail] = useState<string | undefined>(Driver?.email);
    const [fnameVal, setFirstnameVal] = useState<boolean>(false);
    const [lnameVal, setLastnameVal] = useState<boolean>(false);
    const [emailVal, setEmailVal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')

    /** 
* *
* handles the submit for confirmation and sends a post or patch request to the mongoDB.
* 
*  @returns patch request Drivers. */

    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault();

        const validated = [fname, lname, email].every(Boolean);
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
            if (!email) {
                setEmailVal(true);
            } else {
                setEmailVal(false);
            }

            if (validated) {

                const updDriver: Driver = defaultDriver;
                updDriver.id = Driver!.id;

                if (fname) { updDriver.first_name = fname; }
                if (lname) { updDriver.last_name = lname; }
                if (email) { updDriver.email = email; }

                console.log({ updDriver });

                dispatch(updateADriver(updDriver));
                navigate('/drivers');
            }
        }
        catch (error) {
            setErrorMessage("Driver NOT FOUND.");
            console.log('errorMessage: ', errorMessage);
        }

    }

    return (
        <div className="update-driver" data-testid="update-driver-test" >
            <Container>

                <Form onSubmit={submitHandler}
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
                        <Form.Control
                            type="text"
                            className="fname"
                            data-testid="update-driver-fname"
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
                            data-testid="update-driver-lname"
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
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control
                            type="text"
                            aria-label="email"
                            className="email"
                            data-testid="update-driver-email"
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

                    <Button className="btn btn-outline-light btn-sm bg-primary" type="submit" data-testid="driver-update-button">Update Driver Details</Button>
                    <p>{errorMessage}</p>
                </Form>
            </Container>
        </div>
    )
}


export default UpdateDriver
