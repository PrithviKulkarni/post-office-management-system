import { Card } from "react-bootstrap";
import { getAllLetters } from "../../features/LetterSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';

const Letters = () => {
  const letters = useAppSelector(getAllLetters);

  return (
    <div style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
      data-testid="letterList ">
      {letters.map((letter, idx) => (
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
          key={letter.id}
        >
          <Card.Body>
            <Card.Title style={{ color: "white", fontWeight: "bold" }}>
              {letter.address}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {letter.dispatched.toString().slice(0, 24)}
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>
              {letter.delivery_class}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              {letter.delivered ? "Delivered" : "Not Delivered" }
            </Card.Subtitle>
            <Link to={`/editLetter/${letter.id}`} data-testid="edit-button">Edit Letter</Link>
            <br />
            <Link to={`/deleteLetter/${letter.id}`} data-testid="delete-button">Delete Letter</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Letters;
