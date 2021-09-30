import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import Image from 'react-bootstrap/Image'
import SyncLoader from "react-spinners/SyncLoader";

const SignUpView = (props) => {


    const {userImage,handleUpload,handleSubmit,loading}=props

    return(
        <Container>
        <Row className='mt-5 justify-content-center'>     
               
                <Container className='d-flex justify-content-center'>
                    <h2 className="display-4">Registrarse</h2>
                </Container>
                
                <Row className=' mt-5 justify-content-center'>
                    <Image src={userImage} style={{width:'12rem'}} roundedCircle/>
                </Row>

                <Row className='mt-5 justify-content-center col-md-4'>
                    <FormGroup className="mb-3">
                        <FormControl name='image' type="file" size="sm" onChange={async (e)=> await handleUpload(e)}/>
                    </FormGroup>     
                </Row>
        </Row>
        <Row className='mt-5 justify-content-center'> 
                    
                <Form className='col-md-6' onSubmit={async (e)=> await handleSubmit(e)} >
                    <Form.Group>
                        <Form.Label>Nombre Completo</Form.Label>
                        <FormControl required type="text" name="name" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl required type="text" name="username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <FormControl required type="text" name="email" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <FormControl required type="password" placeholder="Minimo 8 caractares" name="password"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <FormControl required type="password" name="confirmpassword"/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button variant="primary" type="submit">Crear Cuenta
                        <SyncLoader loading={loading} size={8} color={"#0043b8"} ></SyncLoader>
                        </Button>
                        
                    </Form.Group>
                </Form>
                
        </Row>     
        </Container>
    )
}

export default SignUpView