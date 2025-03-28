import { categories } from "./constants";

export type Category = (typeof categories)[number];

export type Categories = (typeof categories)[number]["key"];

export type Expense = {
    id: string;
    category: Categories;
    amount: number;
    date: string;
}