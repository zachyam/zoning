import { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AddZone() {
    const [newZoneName, setNewZoneName] = useState("");

    async function addNewZone() {
        console.log(newZoneName)
        try {
            const response = await fetch(`http://localhost:4000/addNewZone`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newZoneName }),
            });
            const result = await response.json();
            console.log(result)
            if (!result) {
                console.log("Add popup to show error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h3 style={{ marginTop: '3%' }}> Add Zone</h3>
            <div style={{marginRight: '2%'}} className="flex justify-content-center">
                <InputText 
                    style={{marginRight: '2%', width: '25%'}} 
                    placeholder="Zone Name"
                    onChange={(e) => setNewZoneName(e.target.value)}
                />
            </div>
            <Button
                style={{ marginTop: '5%', backgroundColor: 'green', borderRadius: '5px'}}
                type="submit" 
                onClick={() => addNewZone()}> Add New Zone
            </Button>
        </div>
    )
}