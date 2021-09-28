import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { Link } from "react-router-dom"
import userIcon from '../../images/userIcon.png'
import User from '../User/user'


const AddFriendView = () =>{

    return (
        <Container fluid>
        <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={userIcon} style={{width:'12em'}} roundedCircle></Image>
                </Row>
                <Container className='mt-3 d-flex justify-content-center'>
                    <h3>Nombre</h3>
                </Container>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='outline-primary' as={Link} to='/dashboard'>Regresar</Button>
                </Row>
            </Col>

            <Col  className='mt-4'>
                <Row className='justify-content-center'>
                    <User></User>
                    <User></User>
                    <User></User>
                    <User></User>       
                </Row>
            </Col>
        </Row>
        </Container>
    )
}

export default AddFriendView