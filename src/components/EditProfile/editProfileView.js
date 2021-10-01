import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import SyncLoader from "react-spinners/SyncLoader";
import { useLoggedUser } from '../../contexts/globalContext'

const EditProfileModalView = (props) =>{

    const {visibleProp,setVisibleHandler,handleSubmit,handleUploadFile,loading} = props
    const [user,setUser]=useLoggedUser()


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
                    <FormControl type="text" name="name" placeholder={user.name}/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <FormControl type="text" name="email" placeholder={user.email}/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <FormControl type="password" name="newpassword" placeholder="Minimo 8 caracteres"/>
                </FormGroup>  

                <FormGroup>
                    <Form.Label>Confirmar Contraseña Actual *</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup> 
                <FormGroup>
                    <Form.Label>Modo Bot</Form.Label>
                    <br></br>
                    <FormCheck defaultChecked={user["custom:botmode"]=='1'} inline type="radio" label='Activado' name='botmode' value='1'></FormCheck>
                    <FormCheck defaultChecked={user["custom:botmode"]=='0'} inline type="radio" label='Desactivado' name='botmode'value='0'></FormCheck>
                </FormGroup> 
                <hr></hr>
                <Button variant="warning" type="submit">
                    Editar
                    <SyncLoader loading={loading} size={8} color={"#0043b8"} ></SyncLoader>
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default EditProfileModalView