import { Form,FormGroup,FormControl, Modal,Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"

const NewPubView = (props) =>{

    const {visibleProp,setVisibleHandler,handleUpload,handleSubmit}= props

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Publicacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <FormGroup className="mb-3">
                        <Form.Label>Foto</Form.Label>
                        <FormControl type="file"  onChange={async (e)=> await handleUpload(e)}/>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Comentario</Form.Label>
                        <FormControl required name="comment" as="textarea" rows={3}/>
                    </FormGroup> 
                    <br></br>
                    <Button variant="primary" type="submit">
                        Publicar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default NewPubView