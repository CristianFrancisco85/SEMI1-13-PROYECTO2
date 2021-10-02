import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import userIcon from '../../images/userIcon.png'
import { URL_S3 } from '../../services/utils'

const UserView = (props) =>{
    
    const {userData,handleAddFriend} = props

    return(
        <>
        <Card style={{width:'20em',margin:'1em'}}>
            <Card.Header>
                <Card.Title>{userData.username}</Card.Title>
            </Card.Header>
            <Card.Body>
            <Row className='justify-content-center'>
                    <Image style={{width:'8em'}}  src={`${URL_S3+userData.image}`} roundedCircle ></Image>
                </Row>
                <br></br>
                <Row className='justify-content-center ps-4 pe-4'>
                    <Button variant='success' onClick={() =>handleAddFriend(userData.username)}>Agregar Amigo</Button>
                </Row>
            </Card.Body>
        </Card>
        </>
    )
}

export default UserView