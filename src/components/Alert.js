import React from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'

const Alert = () => {
    return (
        <ToastContainer className="p-3" position="top-center" >
          <Toast autohide>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </ToastContainer>
    )
}

export default Alert
