import "./App.css";
import React from "react";
import { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import CodeRegulations from "./components/CodeRegulations";
import ZoningRegulations from "./components/ZoningRegulations";
import ZoneSelection from "./components/ZoneSelection";
import Tables from "./components/Tables";
import CommonFeatures from "./components/CommonFeatures";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [zone, setZone] = useState('RLD');
  return (
    <div style={{ marginLeft: '2%', marginRight: '2%'}}>
      <ZoneSelection 
        zone={zone}
        setZone={setZone}
        />
      <MDBRow style={{}}>
        <MDBCol md="3">
          <form>
            <div style={{ fontSize: '14px'}} className="grey-text">
              <MDBInput label="Project Address" icon="user" group type="text" validate error="wrong" success="right" />
              <MDBInput label="Project Number" icon="envelope" group type="email" validate error="wrong" success="right" />
              <MDBInput label="Project Applicant" icon="tag" group type="text" validate error="wrong" success="right" />
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3">
          <form>
            <div style={{ fontSize: '14px'}} className="grey-text">
              <MDBInput type="APN" label="APN" icon="pencil-alt" />
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      {/* <Tables/>
      <CodeRegulations />

      <ZoningRegulations /> */}
      <CommonFeatures zone={zone}/>
    </div>

  );
}

export default App;
