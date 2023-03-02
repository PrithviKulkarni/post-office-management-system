import { SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteADriver, getDriverById } from "../../features/DriverSlice";
import { RootState } from "../../app/store";
import { Driver } from "../interfaces/driverinterface";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const DeleteDriver = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const driver: Driver | undefined = useAppSelector((state: RootState) =>
    getDriverById(state, params.driverId!)
  );


  const submitHandler = (event: SyntheticEvent) => {
      dispatch(deleteADriver(driver!));
      navigate("/drivers");
  };

  return (
  <div className="delete-driver" data-testid="delete-driver-test">
      <CardGroup>
      <Card key={driver?.id}>
        <Card.Body>
          <Card.Title>{driver?.first_name} &nbsp; {driver?.last_name}</Card.Title>
          <Card.Text>
            {driver?.email}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button onClick={submitHandler}>Confirm Delete</Button>
        </Card.Footer>
      </Card>
      </CardGroup>
  </div>
  );
}

export default DeleteDriver
