import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLetterById, updateALetter } from "../../features/LetterSlice";
import { defaultLetter, Letter } from "../interfaces/letterInterface";
import { RootState } from "../../app/store";

/**
 *
 * @returns A form to fill by the user to create a new chat
 */
const EditLetter = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const letter = useAppSelector((state: RootState) =>
    getLetterById(state, params.letterId!)
  );
  const [address, setAddress] = useState<string | undefined>(letter?.address);
  const [deliveryClass, setDeliveryClass] = useState<string | undefined>(
    letter?.delivery_class
  );
  const [delivered, setDelivered] = useState<string>(String(letter?.delivered));
  const [addressBool, setAddressBool] = useState<boolean>(false);
  const [deliveryClassBool, setDeliveryClassBool] = useState<boolean>(false);
  const [deliveredBool, setDeliveredBool] = useState<boolean>(false);

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
    if (!delivered) {
      setDeliveredBool(true);
    } else {
      setDeliveredBool(false);
    }

    if (validated) {
      const updLetter: Letter  = defaultLetter;
      updLetter.id = params.letterId!
      if (address) {
        updLetter.address = address;
      }
      if (deliveryClass) {
        updLetter.delivery_class = deliveryClass;
      }
      if (delivered) {
        updLetter.delivered = delivered === "true";
      }

      dispatch(updateALetter(updLetter));
      navigate("/letters");
    }
  };

  return (
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
      className="editLetter"
      data-testid="editLetter"
    >
      <Form.Group className="mb-3" controlId="formMessageFrom">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          data-testid="address-input"
          onChange={(event) => setAddress(event.target.value)}
        />
        {addressBool && (
          <Form.Text className="text-muted" data-testid="validate-address">
            Please fill in field
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMessageContent">
        <Form.Label>Delivery Class</Form.Label>
        <Form.Control
          type="text"
          value={deliveryClass}
          data-testid="delivery-input"
          onChange={(event) => setDeliveryClass(event.target.value)}
        />
        {deliveryClassBool && (
          <Form.Text className="text-muted" data-testid="validate-delivery">
            Please fill in field
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMessageContent">
        <Form.Label>Delivered</Form.Label>
        <Form.Control
          type="text"
          value={delivered}
          data-testid="delivered-input"
          onChange={(event) => setDelivered(event.target.value)}
        />
        {deliveredBool && (
          <Form.Text className="text-muted" data-testid="validate-delivered">
            Please fill in field
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" data-testid="editButton">
        Submit
      </Button>
    </Form>
  );
};

export default EditLetter;
