export interface FeedBackResponse{
    err: boolean;
    errMessage: string;
    data: FeedBack
}

export interface FeedBack{
    user:string
    feedback: string
    created_on: Date
}