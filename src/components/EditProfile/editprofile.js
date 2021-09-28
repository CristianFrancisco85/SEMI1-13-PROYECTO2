import { useLoggedUser } from '../../contexts/globalContext';
import EditProfileModalView from './editProfileView';


const EditProfileModal = (props) =>{

    const {setVisibleHandler,visibleProp} = props

    const [user,setUser] = useLoggedUser()

    const handleSubmit = () =>{

    }

    const handleUploadFile = () =>{

    }

    return(
        <EditProfileModalView
        visibleProp={visibleProp}
        setVisibleHandler={setVisibleHandler}
        handleSubmit={handleSubmit}
        handleUploadFile={handleUploadFile}
        ></EditProfileModalView>
    )


}

export default EditProfileModal