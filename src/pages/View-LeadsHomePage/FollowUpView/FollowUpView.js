import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import './FollowUpView.css'

function FollowUpView() {
  return (
    
      <div className='followup-div'>
        <div className='row'>

          <button className='followup-btn'>
            <span><CiCirclePlus className='svg-follow-up' /></span>
            New Follow Up
          </button>

        </div>

        <div className='row'>
          <div className='col-md-12'>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
</div>
      )
}

      export default FollowUpView