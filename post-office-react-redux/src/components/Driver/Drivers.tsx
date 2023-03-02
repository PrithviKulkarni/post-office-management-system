import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { getAllDrivers } from "../../features/DriverSlice";
import { useAppSelector } from "../../app/hooks";

const Drivers = () => {
    const drivers = useAppSelector(getAllDrivers);
    console.log({ drivers });


    /**
     * *
     * Loads an array of Players Games and displays them a table.
     *
     *  @returns array of Players Games. */

    return (

        <div className="drivers" data-testid="drivers-page">
            <Accordion defaultActiveKey="0">
                {drivers.map(driver => (
                    <Accordion.Item eventKey={driver.id} className="accordian-item" data-testid="accordian-item">
                        <Accordion.Header><h3>{driver.first_name} &nbsp; {driver.last_name}</h3></Accordion.Header>
                        <Accordion.Body className="bg-warning">                                    <div>
                            <Link style={{ color: "black" }} to={`/updateDriver/${driver.id}`}>
                                Update Driver
                            </Link> &nbsp;
                            <Link style={{ color: "black" }} to={`/deleteDriver/${driver.id}`}>
                                Delete Driver
                            </Link>
                        </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default Drivers;
