import React, { useState } from 'react'
import './AddStage.css'
import axios from 'axios';

function AddStage(props) {
    const [leadStage, setLeadStage] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.post('Leads/AddLeadStatus', {
                StatusName: leadStage, 
            });

            if (response.status === 200) {
                alert('Lead stage added successfully!');
                setLeadStage(''); 
                props.addLeadStage(leadStage);
                document.getElementById("closeModalButton").click(); // Close the modal
                
            }
        } catch (error) {
            console.error('Error adding lead stage:', error);
            alert('Failed to add lead stage.');
        }
    };



    return (
        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Lead Stage</h5>
                        <button type="button" className="close " data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Lead Stage:</label><br />
                                <input
                                    type="text"
                                    value={leadStage}
                                    onChange={(e) => {
                                        const capitalizedWords = e.target.value
                                            .split(' ') 
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
                                            .join(' '); 
                                        setLeadStage(capitalizedWords); 
                                    }}
                                    placeholder="Enter lead stage"
                                />


                            </div>
                        </div>


                    </div>
                    <div className="modal-footer">

                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mr-2" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleSave}>Save</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStage