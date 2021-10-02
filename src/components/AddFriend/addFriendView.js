import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { Link } from "react-router-dom"
import userIcon from '../../images/userIcon.png'
import User from '../User/user'
import { useLoggedUser } from '../../contexts/globalContext'


const AddFriendView = (props) =>{

    const [user,setUser]=useLoggedUser()
    const {persons}= props

    return (
        <Container fluid>
        <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={user.image||userIcon} style={{width:'12em',height:'12em'}} roundedCircle></Image>
                </Row>
                <Container className='mt-3 d-flex justify-content-center'>
                    <h3>{user.username}</h3>
                </Container>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='outline-primary' as={Link} to='/dashboard'>Regresar</Button>
                </Row>
            </Col>

            <Col  className='mt-4'>
                <Row className='justify-content-center'>
                    {persons.map(person=>{
                        return <User key={person.username} data={person}></User>
                    })}   
                </Row>
            </Col>
        </Row>
        
        </Container>
    )
}

export default AddFriendView