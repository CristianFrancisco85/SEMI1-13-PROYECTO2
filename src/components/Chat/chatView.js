import { Card, Col, Container, Row, Button, Form, FormGroup, FormControl} from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { useLoggedUser } from '../../contexts/globalContext'


const ChatView = (props) =>{

    const {usersChat,sendMessage,selectedUser,setSelectedUser}=props

    return (
        <Container fluid>
            <Row>
                <Col md={3} className='mt-4'>
                    <Container className='mt-3 d-flex justify-content-center'>
                        <h3>Chat</h3>
                    </Container>
                    {usersChat.map(tempuser =>{
                        return <Card key={tempuser.userID}>
                            <Card.Header >
                                <Card.Title>{tempuser.username}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Button  onClick={()=>setSelectedUser(tempuser)} > Ver Chat </Button>
                            </Card.Body>
                        </Card>
                    })}
                </Col>
                <Col className='mt-5'>
                    <Container className='mt-3 d-flex'>
                        <h3>{selectedUser?.username}</h3>
                    </Container>
                    {selectedUser?.messages?.map( (msg,index) =>
                        msg.mine
                        ?<Container key={index} className='mt-3 d-flex justify-content-end'>{msg.content}</Container>
                        :<Container key={index} className='mt-3 d-flex justify-content-start'>{msg.content}</Container>
                    )}
                    <Row>
                        { selectedUser?.username?
                            <Form onSubmit={(e)=>sendMessage(e,selectedUser?.session)}>
                            <FormGroup>
                                <FormControl required name="message" as="textarea" rows={3}/>
                            </FormGroup> 
                            <br></br>
                            <Button variant="success" type="submit">
                                Enviar
                            </Button>
                            </Form>:<></>
                        }

                    </Row>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default ChatView