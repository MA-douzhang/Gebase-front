/**
 * 队伍任务类型
 */
export type teamTaskType = {
    id: number;
    username: string;
    userAccount: string;
    userProfile?: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userState: number;
    userRole: number;
    tags: string;
    createTime: Date;
};
