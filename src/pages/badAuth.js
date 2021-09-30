import { useHistory } from "react-router"

export const BadAuthError = () => {
    const history = useHistory()
    return(
        <>
        <h1 className="display-6">Error: Not logged user </h1>
        <a href='#'> <p className="h6">Login</p></a>
        </>
    )
}