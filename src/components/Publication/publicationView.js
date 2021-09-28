import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import userIcon from '../../images/userIcon.png'


const PublicationView = (props) =>{

    const {data} = props

    return(
        <>
            <Card style={{width:'32em',margin:'2em'}}>
                <Card.Header>
                    <Row className='justify-content-center p-2'>
                        <Col className='col-md-3 me-4'>
                            <Image src={userIcon} style={{width:'6em'}} roundedCircle></Image>
                        </Col>
                        <Col>
                            <Card.Title>Nombre de Usuario</Card.Title>
                            <h6>Fecha </h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    Mi Publication
                </Card.Body>
            </Card>
        </>
    )
}

export default PublicationView