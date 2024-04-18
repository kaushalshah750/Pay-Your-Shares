export interface FeedBackResponse{
    err: boolean;
    errMessage: string;
    data: FeedBack
}

export interface FeedBack{
    User_id: number
    Feedback: string
    Created_on: Date
}