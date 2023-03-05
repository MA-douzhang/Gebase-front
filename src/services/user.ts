import myAxios from "../plugins/myAxios";
import {serCurrentUserState} from "../states/user";
import {userType} from "../models/user";

export const getCurrentUser = async () => {
    // const currentUser :userType= getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    //不存在
    const res = await myAxios.get('user/current');
    if(res.code === 0){
        serCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

