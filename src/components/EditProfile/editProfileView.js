import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'

const EditProfileModalView = (props) =>{

    const {visibleProp,setVisibleHandler,handleSubmit,handleUploadFile} = props


    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleSubmit(e)}>

                <FormGroup className="mb-3">
                    <Form.Label>Foto de Perfil</Form.Label>
                    <FormControl type="file"  onChange={async (e)=> await handleUploadFile(e)}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nombre Completo</Form.Label>
                    <FormControl required type="text" name="name"/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Usuario</Form.Label>
                    <FormControl required type="text" name="name"/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Contraseña</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup> 
                <FormGroup>
                    <Form.Label>Modo Bot</Form.Label>
                    <br></br>
                    <FormCheck required inline type="radio" label='Activado' name='visibility' value='1'></FormCheck>
                    <FormCheck required inline type="radio" label='Desactivado' name='visibility'value='0'></FormCheck>
                </FormGroup> 
                <hr></hr>
                <Button variant="warning" type="submit">
                    Editar
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default EditProfileModalView