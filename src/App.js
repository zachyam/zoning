import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import CodeRegulations from "./components/CodeRegulations";
import ZoningRegulations from "./components/ZoningRegulations";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div>
      <MDBRow style={{ paddingTop: '75px', paddingLeft: '100px', margin: 'auto'}}>
        <MDBCol md="6">
          <form>
            <div className="grey-text">
              <MDBInput label="Project Address" icon="user" group type="text" validate error="wrong" success="right" />
              <MDBInput label="Project Number" icon="envelope" group type="email" validate error="wrong" success="right" />
              <MDBInput label="Project Applicant" icon="tag" group type="text" validate error="wrong" success="right" />
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3">
          <form>
            <div className="grey-text">
              <MDBInput type="APN" label="APN" icon="pencil-alt" />
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      <CodeRegulations/>
      <ZoningRegulations/>
    </div>
    
  );
}

export default App;
