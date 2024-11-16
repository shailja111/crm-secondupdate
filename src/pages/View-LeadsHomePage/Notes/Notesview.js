import React from 'react'
import './Notesview.css'
import { CiCirclePlus } from 'react-icons/ci';

function Notesview() {
  return (
    <div className='notes-view'>
      <div className='row'>

        <button className='followup-btn'>
          <span><CiCirclePlus className='svg-note' /></span>
          Add Note
        </button>

      </div>
    </div>
  )
}

export default Notesview;