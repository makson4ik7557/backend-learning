export const allowedStatuses = ["unresolved" , "resolved"] as const;
export type marketStatus = typeof allowedStatuses[number];

export function isMarketStatus(curStatus:string): curStatus is marketStatus {
    return allowedStatuses.includes(curStatus as marketStatus);
}

export interface Market{
    id : number;
    question : string;
    price : number;
    status : marketStatus;
}