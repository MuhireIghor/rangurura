export type UserDto = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    phone:string;
    
    
}
export type AgencyStaffUserDto = UserDto & {
    role:"AGENCY_STAFF"|"ADMIN"|"CITIZEN";
    agencyId:number;
    userId:number;
    position:string;
}

export type LoginDto = {
    email:string;
    password:string;
}
export enum ERole{
    CITIZEN = 'CITIZEN',
    AGENCY_STAFF = 'AGENCY_STAFF',
    ADMIN = 'ADMIN'
}