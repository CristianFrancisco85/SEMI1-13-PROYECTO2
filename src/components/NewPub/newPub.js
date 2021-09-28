import { useLoggedUser } from "../../contexts/globalContext"
import NewPubView from "./newPubView"

const NewPub = (props) =>{

    const {setVisibleHandler,visibleProp} = props
    const [user,setUser] = useLoggedUser()

    const handleSubmit = () =>{

    }
    const handleUpload = () =>{

    }


    return(
        <NewPubView
        visibleProp={visibleProp}
        setVisibleHandler={setVisibleHandler}
        handleSubmit={handleSubmit}
        handleUpload={handleUpload}
        ></NewPubView>
    )

}

export default NewPub