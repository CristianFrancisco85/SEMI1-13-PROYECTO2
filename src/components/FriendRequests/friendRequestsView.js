import {Card,Modal,Button,Row,Image } from "react-bootstrap"
import { URL_S3 } from "../../services/utils"

const FriendRequestsView = (props) =>{

    const {visibleProp,setVisibleHandler,handleAccept,handleReject,requests}= props

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Solicitudes de Amistad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {requests.map(request=>{
                    return <Row>
                        <Card>
                            <Card.Header>
                                <Card.Title>{request.username}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Image src={`${URL_S3+request.image}`} style={{width:'5rem',height:'5rem',marginRight:'2em'}} roundedCircle></Image>
                                <Button className='me-2' variant='success' onClick={()=>handleAccept(request.username)}>Aceptar</Button>
                                <Button variant='danger' onClick={()=>handleReject(request.username)}>Rechazar</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                })}
            </Modal.Body>
        </Modal>
    )

}

export default FriendRequestsView