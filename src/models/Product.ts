export interface Product {
    id: string;
    name: string;
    segment: string;
    goal: number;
    produced: number;
    remaining: number;
    percent: number,
    goalAchieved : boolean,
    hasChildren: boolean,
    children?: { key : string, name: string; goal: number, produced: number }[];
}