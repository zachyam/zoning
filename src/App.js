import "./App.css";
import React from "react";
import { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import ZoneSelection from "./components/ZoneSelection";
import ZoneRegulations from "./components/ZoneRegulations";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [zone, setZone] = useState('RLD');
  const [projectAddress, setProjectAddress] = useState('');
  const [apn, setApn] = useState('')
  const [projectNumber, setProjectNumber] = useState('');
  const [projectApplicant, setProjectApplicant] = useState('');

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%'}}>
      <ZoneSelection 
        zone={zone}
        setZone={setZone}
        />
      <MDBRow>
        <MDBCol md="3">
          <form>
            <div style={{ fontSize: '14px'}} className="grey-text">
              <MDBInput 
                label="Project Address" 
                icon="user" 
                group type="text" 
                validate error="wrong" 
                success="right" 
                onChange={(e) => setProjectAddress(e.target.value)} />
              <MDBInput 
                label="Project Number" 
                icon="envelope" 
                group type="email" 
                validate error="wrong" 
                success="right"
                onChange={(e) => setProjectNumber(e.target.value)} />
              <MDBInput 
                label="Project Applicant" 
                icon="tag" 
                group type="text" 
                validate error="wrong" 
                success="right" 
                onChange={(e) => setProjectApplicant(e.target.value)}/>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3">
          <form>
            <div style={{ fontSize: '14px'}} className="grey-text">
              <MDBInput 
                type="APN" 
                label="APN" 
                icon="pencil-alt" 
                onChange={(e) => setApn(e.target.value)}/>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      {/* <Tables/>
      <CodeRegulations />

      <ZoningRegulations /> */}
      <ChakraProvider>
        <ZoneRegulations 
          zone={zone} 
          projectAddress={projectAddress}
          apn={apn}
          projectNumber={projectNumber}
          projectApplicant={projectApplicant}/>
      </ChakraProvider> 
      
    </div>

  );
}

export default App;
