export interface AddSlip {
    Name: string
    Amount: number
    PaidByUserId: number
    AzureId: string | null
    TransactionDate: Date
    Users: number[]
}