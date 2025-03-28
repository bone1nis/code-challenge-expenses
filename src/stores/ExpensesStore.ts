import { makeAutoObservable } from "mobx";

import { Expense } from "../types";

export class ExpensesStore {
    expenses: Expense[] = [
        {
            id: "айди1",
            category: "charity",
            amount: 123,
            date: "01-02-2025"
        },
        {
            id: "айди2",
            category: "clothing",
            amount: 234,
            date: "01-03-2025"
        }
    ]
    constructor() {
        makeAutoObservable(this);
    }

    addExpense(newExpense: Expense) {
        this.expenses.push(newExpense);
    }

    removeExpense(id: Expense["id"]) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
    }

    updateExpense(id: Expense["id"], newFields: Partial<Expense>) {
        this.expenses = this.expenses.map(expense => {
            if (expense.id === id) {
                return { ...expense, ...newFields }
            }
            return expense;
        })
    }
}