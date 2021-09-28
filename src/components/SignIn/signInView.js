import { Link } from "react-router-dom"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import logo from '../../images/logo.png'

const SignInView = (props) =>{

    const {handleLogIn} = props

    return (
        <Container>

            <Row className='mt-5 justify-content-center' >
                <Image src={logo} style={{width:'15em'}}/>
            </Row>
            
            <Row className='mt-5 justify-content-center'>
                <Col lg={5}>
                    <Card border='secondary'>
                        <Card.Header>
                            <Card.Title> Login </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={async (e)=> await handleLogIn(e)}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name="username"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" name="password"/>
                                </Form.Group>
                                
                                <Row className='mt-4'>
                                    <Col className='col-8'>
                                        <Button variant="primary" type="submit">
                                            Entrar
                                        </Button>
                                    </Col>
                                    <Col className='col-4'>
                                        <Card.Link as={Link} to="/signup">
                                            Registrarse
                                        </Card.Link> 
                                    </Col>
                                </Row>      
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            Seminario 1 - Pareja 13
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default SignInView