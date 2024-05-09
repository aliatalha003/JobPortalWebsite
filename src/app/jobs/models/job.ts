import { Applicant } from "../../applicant/models/applicant";
import { Company } from "../../company/models/company";
export interface Job {
    // JobData: any[];
    title:string;
    id:string;
    description:string;
    location:string;
    qualifications:string[];
    applicantApplied: string[];
    salary:string;
    experienceNeeded:string;
    educationLevel:string;
    company:string;
    paused:boolean;
}
