import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Row>
                <Col className="text-center py-3 bg-dark text-light ">
                   <Container className='d-flex justify-content-around align-items-center'>
                   <div>
                   <i class="fa-brands fa-github mx-2"></i>
                    <a href='https://github.com/anshnarula5/ecommerce'>Github</a>
                   </div>
                   <div>
                   <i class="fa-brands fa-linkedin-in mx-2  "></i>
                    <a href='https://www.linkedin.com/in/anshnarula/'>LinkedIn</a>
                   </div>
                   </Container>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer
