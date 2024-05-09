import { Job } from "../../jobs/models/job";
export interface Company {
    id:string;
    name: string;
    email: string;
    address:string;
    field: string;
    password: string;
    jobs:string[];
    yearFounded:string;
    about:string;
    logo:string;
    
}
