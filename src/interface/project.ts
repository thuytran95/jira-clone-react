import { Issue } from "./issue";
import { User } from "./user";

export interface Project {
    id: string;
    name: string;
    url: string;
    description: string;
    category?: string;
    createdAt: string;
    updatedAt: string;
    users : User[];
    issues: Issue[]
}
