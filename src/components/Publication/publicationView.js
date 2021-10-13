import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import userIcon from '../../images/userIcon.png'
import {URL_S3} from '../../services/utils'
import Button from 'react-bootstrap/Button'


const PublicationView = (props) =>{

    const {data,handleTranslate} = props

    return(
        <>
            <Card style={{width:'32em',margin:'2em'}}>
                <Card.Header>
                    <Row className='justify-content-center p-2'>
                        <Col className='col-md-3 me-4'>
                            <Image src={`${URL_S3+data.image}`} style={{width:'6em',height:'6em'}} roundedCircle></Image>
                        </Col>
                        <Col>
                            <Card.Title>{data.username}</Card.Title>
                            <h6>{data.fecha}</h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {data.comentario}
                    <Image  style={{width:'28em',marginTop:'2em'}} src={`${URL_S3+data.pubimage}`}></Image>
                </Card.Body>
                <Card.Footer>
                    <Button variant='outline-secondary' onClick={handleTranslate}> Traducir Publicacion </Button>
                </Card.Footer>
            </Card>
        </>
    )
}

export default PublicationView