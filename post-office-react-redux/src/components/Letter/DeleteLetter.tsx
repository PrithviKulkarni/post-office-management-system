import React from "react";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getLetterById, deleteALetter } from "../../features/LetterSlice";
import Button from "react-bootstrap/Button";
import { Letter } from '../interfaces/letterInterface';

/**
 * 
 * @returns a new page with the specified chat data to be displayed and confirmed for deletion.
 */
const DeleteLetter = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const letter : Letter | undefined = useAppSelector((state: RootState) =>
    getLetterById(state, params.letterId!)
  );

  const handleDelete = () => {
    dispatch(deleteALetter(letter!));
    navigate("/letters")
  };

  return (
    <div style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    }}
    data-testid="deleteLetter"
    className="deleteLetter">
    <Card
          style={{
            width: "25rem",
            padding: "1rem",
            margin: "5px",
            backgroundColor: "rgb(40,40,40)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={letter?.id}
        >
          <Card.Body>
            <Card.Title style={{ color: "white", fontWeight: "bold" }}>
              {letter?.address}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {letter?.dispatched.toString().slice(0, 24)}
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>
              {letter?.delivery_class}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              {letter?.delivered ? "Delivered" : "Not Delivered" }
            </Card.Subtitle>
          </Card.Body>
          <Button onClick={handleDelete} data-testid="deleteButton">Confirm Delete</Button>
        </Card>
    </div>
  );
};

export default DeleteLetter;
