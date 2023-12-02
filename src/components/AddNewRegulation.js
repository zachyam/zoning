import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
  
export default function AddNewRegulation({ zone, newCodeRegulationName, setNewCodeRegulationName, newCodeRegulationVal, newCodeRegulationMinVal, 
                                           setNewCodeRegulationMinVal, newCodeRegulationMaxVal, setNewCodeRegulationMaxVal, 
                                           setNoMinimum, noMinimum, setNoMaximum, noMaximum, unit, setUnit, setRowModified }) {
    async function addNewRegulation() {
        try {
            const data = { zone, newCodeRegulationName, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit, noMaximum, noMinimum }
            console.log(data)
            const response = await fetch(`http://localhost:4000/addZoneCompliance/${zone}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
            });

            const responseData = await response.json();
            console.log(responseData);
            setRowModified(true);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div>
            <h3 style={{ marginTop: '3%' }}> Add New Development Standard to {zone}</h3>
            <div style={{marginRight: '2%', display:'inline'}} className="flex justify-content-center">
                    <InputText 
                        style={{marginRight: '2%', width: '25%'}} 
                        placeholder="Development Standard Name" 
                        onChange={(e) => setNewCodeRegulationName(e.target.value)}/>
                    <InputText
                        label="Unit" 
                        group type="text"
                        placeholder='Unit'
                        validate error="wrong" 
                        success="right" 
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
                <div style={{marginTop: '1%', marginBottom: '1%'}} className="flex align-items-center">
                        <InputText 
                            label="Minimum Value" 
                            group type="text" 
                            validate error="wrong" 
                            success="right" 
                            onChange={(e) => setNewCodeRegulationMinVal(e.target.value)}
                            disabled={noMinimum}
                        />
                </div>
                <div style={{marginBottom: '1%'}}className="flex align-items-center">
                    <Checkbox 
                        name='No Minimum' 
                        value=''
                        id='flexCheckMin' 
                        label='No Minimum' 
                        checked={noMinimum}
                        onChange={() => setNoMinimum(!noMinimum)}
                    />
                    <label style={{marginBottom: '0'}}htmlFor="No Minimum" className="ml-2">No Minimum</label>

                </div>

                <InputText 
                    label="Maximum Value" 
                    group type="text" 
                    validate error="wrong" 
                    success="right" 
                    onChange={(e) => setNewCodeRegulationMaxVal(e.target.value)}
                    disabled={noMaximum}
                />

                <div style={{marginTop: '1%', marginBottom: '1%'}} className="flex align-items-center">
                    <Checkbox 
                        name='No Maximum' 
                        value='' 
                        id='flexCheckMax' 
                        label='No Maximum' 
                        checked={noMaximum}
                        onChange={() => setNoMaximum(!noMaximum)}
                    />
                    <label style={{marginBottom: '0'}}htmlFor="No Maximum" className="ml-2">No Maximum</label>

                </div>

            <Button
                style={{ marginTop: '2%', backgroundColor: 'green', borderRadius: '5px'}}
                type="submit"
                onClick={() => addNewRegulation()}>Add New Development Standard
            </Button>
        </div>
    )

}
