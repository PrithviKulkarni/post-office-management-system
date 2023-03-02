/** 
   * @remarks This page runs the store and contains routers for pages.
   *  */

import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from './app/hooks';
import "bootstrap/dist/css/bootstrap.min.css";

/** 
   * @remarks Menu and footer layouts are found in these pages.
   *  */
import Header from "./components/Header";
import Footer from './components/Footer';
import './styles/App.css'

/** 
   * @remarks Letters pages. A Letter can be created, updated, or deleted.
   *  */
import Letters from './components/Letter/Letters';
import CreateLetter from './components/Letter/CreateLetter';
import EditLetter from './components/Letter/EditLetter';
import DeleteLetter from './components/Letter/DeleteLetter';

/** 
   * @remarks Parcels pages. A Parcel can be created, updated, or deleted.
   *  */
import Parcels from "./components/Parcel/Parcels";
import CreateParcel from './components/Parcel/CreateParcel';
import DeleteParcel from "./components/Parcel/DeleteParcel";
import UpdateParcel from "./components/Parcel/UpdateParcel";

/** 
   * @remarks Depots pages. A Depot can be created, updated, or deleted.
   *  */
import AllDepots from './components/Depot/Depots';
import CreateDepot from './components/Depot/CreateDepot';
import DepotPage from "./components/Depot/DepotPage";

/** 
   * @remarks Drivers pages. A Driver can be created, updated, or deleted.
   *  */
import Drivers from './components/Driver/Drivers';
import CreateDriver from "./components/Driver/CreateDriver";
import UpdateDriver from "./components/Driver/UpdateDriver";
import DeleteDriver from "./components/Driver/DeleteDriver";

/** 
   * @remarks Fetchall for the different pages. This data can be seen in the redux tools on chrome.
   *  */
import { fetchAllLetters } from './features/LetterSlice';
import { fetchAllParcels } from "./features/ParcelSlice";
import { fetchAllDepots } from "./features/DepotSlice";
import { fetchAllDrivers } from "./features/DriverSlice";


/** 
   * @remarks Use of dispatch to fetch the data.
   *  */
function App() {

  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(fetchAllLetters())
    await dispatch(fetchAllParcels())
    await dispatch(fetchAllDepots())
    await dispatch(fetchAllDrivers())
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

    /** 
   * @remarks Contains routes for the different pages
   * @returns Page content.
   *  */
  return (
    <div className="App" data-testid="test">
      <Header />
      <Routes>
        <Route path='/parcels' element={<Parcels />} />
        <Route path='/createParcel' element={<CreateParcel />} />
        <Route path='/deleteParcel/:parcelId' element={<DeleteParcel />} />
        <Route path='/updateParcel/:parcelId' element={<UpdateParcel />} />

        <Route path='/depots' element={<AllDepots />} />
        <Route path='/depots/:depId' element={<DepotPage />} />
        <Route path='/createDepot' element={<CreateDepot />} />

        <Route path='/' element={<Letters />} />
        <Route path='/letters' element={<Letters />} />
        <Route path='/createLetter' element={<CreateLetter />} />
        <Route path='/editLetter/:letterId' element={<EditLetter />} />
        <Route path='/deleteLetter/:letterId' element={<DeleteLetter />} />

        <Route path='/drivers' element={<Drivers />} />
        <Route path='/createDriver' element={<CreateDriver />} />
        <Route path='/updateDriver/:driverId' element={<UpdateDriver />} />
        <Route path='/deleteDriver/:driverId' element={<DeleteDriver />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
