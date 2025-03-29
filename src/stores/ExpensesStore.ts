import { makeAutoObservable } from "mobx";
import { Expense, Filters } from "../utils/types";

const LOCAL_STORAGE_EXPENSES = "expenses_data";
const LOCAL_STORAGE_FILTERS = "expenses_filters";

export class ExpensesStore {
    expenses: Expense[] = [];
    filters: Filters = {
        category: "all",
        minAmount: null,
        maxAmount: null,
        sortByDate: "asc",
    };

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    addExpense(newExpense: Expense) {
        this.expenses.push(newExpense);
        this.sortExpenses();
        this.saveToLocalStorage();
    }

    removeExpense(id: Expense["id"]) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveToLocalStorage();
    }

    updateExpense(id: Expense["id"], newFields: Partial<Expense>) {
        this.expenses = this.expenses.map(expense => {
            if (expense.id === id) {
                return { ...expense, ...newFields };
            }
            return expense;
        });
        this.sortExpenses();
        this.saveToLocalStorage();
    }

    setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
        this.filters[key] = value;
        this.saveToLocalStorage();
    }

    sortExpenses() {
        if (this.filters.sortByDate === "asc") {
            this.expenses.sort((a, b) => a.date - b.date);
        } else {
            this.expenses.sort((a, b) => b.date - a.date);
        }
    }

    get filteredExpenses() {
        const filtered = this.expenses.filter(expense => {
            return (
                (this.filters.category === "all" || expense.category === this.filters.category) &&
                (this.filters.minAmount === null || expense.amount >= this.filters.minAmount) &&
                (this.filters.maxAmount === null || expense.amount <= this.filters.maxAmount)
            );
        });

        return filtered.sort((a, b) => {
            if (this.filters.sortByDate === "asc") {
                return a.date - b.date;
            } else {
                return b.date - a.date;
            }
        });
    }

    private saveToLocalStorage() {
        localStorage.setItem(LOCAL_STORAGE_EXPENSES, JSON.stringify(this.expenses));
        localStorage.setItem(LOCAL_STORAGE_FILTERS, JSON.stringify(this.filters));
    }

    private loadFromLocalStorage() {
        const savedExpenses = localStorage.getItem(LOCAL_STORAGE_EXPENSES);
        const savedFilters = localStorage.getItem(LOCAL_STORAGE_FILTERS);

        if (savedExpenses) {
            this.expenses = JSON.parse(savedExpenses);
        }

        if (savedFilters) {
            this.filters = JSON.parse(savedFilters);
        }
    }
}