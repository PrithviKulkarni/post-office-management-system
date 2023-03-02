import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import DepotDetails from "./DepotDetails"
import UpdateDepot from "./UpdateDepot";
import DeleteDepot from "./DeleteDepot";


const DepotPage = () => {
    const navigate = useNavigate();

    const submitHandler = (event: SyntheticEvent) => {

        event.preventDefault();

        navigate('/depots');

    }

    return (
        <div data-testid="depotPage">
            <div>
                <DepotDetails />
            </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div>
                <UpdateDepot/>
            </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <DeleteDepot/>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <Form onSubmit={submitHandler}>
                <Button type="submit" className="button" data-testid="buttonO">Return</Button>
            </Form>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
            <div> &nbsp; </div>
        </div>
    )
}

export default DepotPage