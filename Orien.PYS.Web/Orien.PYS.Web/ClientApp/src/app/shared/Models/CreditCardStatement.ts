import { CreditCard } from "./CreditCard"

export interface CreditCardStatement{
    id: number 
    creditCard: CreditCard
    amount: number 
    minimumAmountDue: number 
    dueDate: Date
    statementDate: Date
}