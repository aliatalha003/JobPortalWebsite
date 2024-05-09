import { Job } from "../../jobs/models/job";
import { Course } from "./course";


export interface Applicant {
    id:string;
    firstName: string;
    password:string;
    lastName: string;
    gender: string;
    dob: Date;
    phone: string;
    address:string;
    courses:Course[];
    experienceYears:string;
    education:string;
    email:string;
    favJobs:Job[];
    cv:string;
    about:string;
}
