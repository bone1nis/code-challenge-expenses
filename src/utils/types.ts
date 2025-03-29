import { categories } from "./constants";

export type Category = (typeof categories)[number];

export type Categories = (typeof categories)[number]["key"];

export type Expense = {
    id: string;
    category: Categories;
    amount: number;
    date: number;
}

export type Filters = {
    category: Categories | "all";
    minAmount: number | null;
    maxAmount: number | null;
    sortByDate: "asc" | "desc";
}