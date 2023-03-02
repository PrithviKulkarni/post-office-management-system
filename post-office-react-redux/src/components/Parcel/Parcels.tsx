import React from 'react'
import { getAllParcels } from '../../features/ParcelSlice';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Parcels = () => {

  const parcels = useAppSelector(getAllParcels)

  return (
    <div className="parcels" data-testid="parcels">
      <div>
      <div className='App'>
  
     

        <Accordion defaultActiveKey='0'>
          
          <h3 className="text-success text-center"> <Link to={`/createParcel`}> Add a parcel </Link></h3>
        
        
          <h4 className="text-white">
            {' '}
            <u>Parcels</u>{' '}
          </h4>
          

          {parcels?.map(parcel => (
            <Accordion.Item eventKey={parcel.id}>
              <Accordion.Header>
            
                <h6>Parcel no: {parcel.parcel_no} </h6>
              </Accordion.Header>

              <Accordion.Body className="bg-info">
              <b> Parcel weight(kg): </b> {parcel.parcel_weight} <br/>
              <b> Status: </b> {parcel.status}<br/>
              <b> Estimated delivery time (in days):</b> {parcel.estimated_delivery_days} <br/>


             <div className='text-dark'>
            <Link to={`/updateParcel/${parcel.id}`}> <b>Update </b> </Link> &nbsp;&nbsp;
            <br/>
            <Link to={`/deleteParcel/${parcel.id}`}><b>Delete</b></Link>
            </div>

              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
      
    </div>
  )
}

export default Parcels
