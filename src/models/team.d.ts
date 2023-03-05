/**
 * 队伍类型
 */
import {userType} from "./user";

export type teamType = {
    id: number;
    teamName: string;
    userId:number;
    description: string;
    expireTime?: Date;
    maxNum:number;
    teamState:number;
    teamPassword?:string;
    updateTime: Date;
    createTime: Date;
    createUser?: userType;
    hasJoin:boolean;
    hasJoinNum:number;
};
