import React, { useState, SyntheticEvent, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


import { Container, Button, Form, InputGroup } from 'react-bootstrap';


import { Depot, defaultDepot } from '../interfaces/depotinterface';
import { updateADepot, getDepotById } from '../../features/DepotSlice';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';




const UpdateDepot = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [city, setCity] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [workers, setWorkers] = useState<number>(0);

    let { depId } = useParams();
    let depotId: string = "0";
    if (!depId) { depId = "0"; }
    depotId = depId;
    console.log({ depotId });

    const depots = useSelector((state: RootState) => getDepotById(state, depotId));

    useEffect(() => {
        if (depots?.city) { setCity(depots.city); }
        if (depots?.workers) { setWorkers(depots.workers); }

    }, [depots])



    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault();

        const validated = [depId, city, workers].every(Boolean);
        try {
            if (validated) {

                const updDepotData: Depot = defaultDepot;

                if (depId) { updDepotData.id = depId; }
                if (city) { updDepotData.city = city; }
                if (workers) { updDepotData.workers = Number(workers); }


                console.log({ updDepotData });


                dispatch(updateADepot(updDepotData));
                navigate('/depots');

            }
        }
        
        catch (error) {
            setErrorMessage("Depot NOT FOUND.");
            console.log('errorMessage: ', errorMessage);
        }

    }





   

        return (
            <Container className="updateDepot" data-testid="updateDepot">

                <Form onSubmit={submitHandler} data-testid="create-depot-city">


                    <InputGroup className="city">
                        <InputGroup.Text id="basic-addon1">Depot City</InputGroup.Text>
                        <Form.Control
                            type="text"
                            aria-describedby="basic-addon1"
                            aria-label="city"
                            size="sm"
                            data-testid="cityIn"
                            name="city"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                    </InputGroup>


                   


                    <InputGroup className="workers" data-testid="create-driver-workers">
                        <InputGroup.Text id="basic-addon1">Number of Workers</InputGroup.Text>
                        <Form.Control
                            type="text"
                            aria-describedby="basic-addon1"
                            aria-label="workers"
                            size="sm"
                            data-testid="workersIn"
                            name="workers"
                            value={workers}
                            onChange={event => setWorkers(Number(event.target.value))}
                        />
                    </InputGroup>

                    <Button type="submit" className="button" data-testid="button">Update Depot Details</Button>
                    <p>{errorMessage}</p>
                </Form>
            </Container>
        )
    
}

export default UpdateDepot
