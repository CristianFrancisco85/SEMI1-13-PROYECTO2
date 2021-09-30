import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import userIcon from '../../images/userIcon.png'

const UserView = (props) =>{
    
    const {userData,handleAddFriend} = props

    return(
        <>
        <Card style={{width:'20em',margin:'1em'}}>
            <Card.Header>
                Username
            </Card.Header>
            <Card.Body>
            <Row className='justify-content-center'>
                    <Image style={{width:'8em'}}  src={userIcon} roundedCircle ></Image>
                </Row>
                <br></br>
                <Row className='justify-content-center ps-4 pe-4'>
                    <Button variant='success' onClick={handleAddFriend}>Agregar Amigo</Button>
                </Row>
            </Card.Body>
        </Card>
        </>
    )
}

export default UserView