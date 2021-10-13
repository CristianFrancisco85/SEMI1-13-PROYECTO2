import { useState } from "react"
import { translatePublication } from "../../services/data"
import PublicationView from "./publicationView"

const Publication = (props) =>{

    const [data,setData] = useState(props.data)

    const handleTranslate = async () =>{
        await translatePublication(data.comentario).then(res=>{
            setData(prevState => ({
                ...prevState,
                comentario: res.OK.TranslatedText
            }));

        })
    }
    
    return(
        <PublicationView
        data={data}
        handleTranslate={handleTranslate}
        >
        </PublicationView>
    )
   
}
export default Publication