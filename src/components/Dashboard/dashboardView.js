import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom"
import userIcon from '../../images/userIcon.png'
import { useLoggedUser } from "../../contexts/globalContext"
import Publication from '../Publication/publication'
import { useState } from 'react'
import EditProfileModal from '../EditProfile/editprofile'
import NewPub from '../NewPub/newPub'
import FriendRequest from '../FriendRequests/friendRequests'
import Chips,{Chip} from 'react-chips'
import Chat from '../Chat/chat'


const DashboardView = (props) =>{
    
    const {publications,filters,onChangeFilters,allTags}=props
    const [user,setUser]= useLoggedUser()
    const [editModal,setEditModal] = useState(false)
    const [newPub,setNewPubModal] = useState(false)
    const [requestModal,setRequestModal] = useState(false)

    return(
        <Container fluid>
            <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={user.image||userIcon} style={{width:'12rem',height:'12rem'}} roundedCircle></Image>
                </Row>
                <Container className='mt-3 d-flex justify-content-center'>
                    <h3>{user.username}</h3>
                </Container>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='warning' onClick={()=>setEditModal(true)}>Editar Perfil</Button>
                    <EditProfileModal visibleProp={editModal} setVisibleHandler={setEditModal}></EditProfileModal>
                </Row>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='primary' onClick={()=>setNewPubModal(true)}>Nueva Publicacion</Button>
                    <NewPub visibleProp={newPub} setVisibleHandler={setNewPubModal}></NewPub>
                </Row>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='success' as={Link} to='/dashboard/addfriend'>Agregar Amigo</Button>
                </Row>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='secondary' onClick={()=>setRequestModal(true)}>Solicitudes</Button>
                    <FriendRequest visibleProp={requestModal} setVisibleHandler={setRequestModal}></FriendRequest>
                </Row>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='info' as={Link} to='/dashboard/chat'>Chat</Button>
                </Row>
                <Row className='mt-2 ps-5 pe-5'>
                    <Button variant='danger' as={Link} to='/'>Cerrar Sesion</Button>
                </Row>
            </Col>
            <Col className='mt-5'>
                <Row className='justify-content-center'>
                <Chips
                    value={filters}
                    onChange={(filters) => onChangeFilters(filters)}
                    suggestions={allTags}
                />
                </Row>
                <Row className='justify-content-center'>
                    {publications.map((item,index)=> {
                        if(filters.length>0){
                            if(item.etiquetas.split(',').some(r=> filters.includes(r))){
                                return <Publication key={index} data={item}></Publication>
                            }
                        }
                        else{
                            return <Publication key={index} data={item}></Publication>
                        }
                        
                    })}
                </Row>
            </Col>
            </Row>
        </Container>
    )
}

export default DashboardView