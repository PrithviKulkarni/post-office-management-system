import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../../app/hooks";
import { addNewLetter } from "../../features/LetterSlice";
import { defaultLetter, Letter } from "../interfaces/letterInterface";

/**
 *
 * @returns A form to fill by the user to create a new chat
 */
const CreateLetter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("");
  const [deliveryClass, setDeliveryClass] = useState<string>("");
  const [addressBool, setAddressBool] = useState<boolean>(false);
  const [deliveryClassBool, setDeliveryClassBool] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const validated = [address, deliveryClass].every(Boolean);

    if (!address) {
      setAddressBool(true);
    } else {
      setAddressBool(false);
    }
    if (!deliveryClass) {
      setDeliveryClassBool(true);
    } else {
      setDeliveryClassBool(false);
    }

    if (validated) {
      const updLetter: Letter = defaultLetter;
      if (address) {
        updLetter.address = address;
      }
      if (deliveryClass) {
        updLetter.delivery_class = deliveryClass;
      }

      dispatch(addNewLetter(updLetter));
      navigate("/letters");
    }
  };

  return (
    <div className="createLetter" data-testid="createLetter">
      <Form
        onSubmit={handleSubmit}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Form.Group className="mb-3" controlId="formMessageFrom">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            data-testid="address-input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {addressBool && (
            <Form.Text className="text-muted" data-testid="validate-address">Please fill in field</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessageContent">
          <Form.Label>Delivery Class</Form.Label>
          <Form.Control
            type="text"
            data-testid="delivery-input"
            value={deliveryClass}
            onChange={(event) => setDeliveryClass(event.target.value)}
          />
          {deliveryClassBool && (
            <Form.Text className="text-muted" data-testid="validate-delivery">Please fill in field</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="createButton" data-testid="createButton">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateLetter;
