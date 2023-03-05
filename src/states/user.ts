import {userType} from "../models/user";

let currentUser : userType;

const serCurrentUserState = (user:userType) =>{
    currentUser = user;
}
const getCurrentUserState = () : userType => {
    return currentUser;
}
export {
    serCurrentUserState,
    getCurrentUserState,
}
