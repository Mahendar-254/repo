import { Navigate } from "react-router-dom";

import { isAuthenticated } from "./Login";


 

type ProtectedRouteProps = {

    component : React.ComponentType;

}


 

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({component : Component}) => {

    return isAuthenticated() ? <Component/> : <Navigate to={"/login"}/>

}


 

export default ProtectedRoute;