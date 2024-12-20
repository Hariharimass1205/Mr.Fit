export interface User {  
    save(): unknown;    
    userName: string;   
    phone?: number;   
    email: string;   
    password?: string;   
    profileImage?: string;
    gender?: string;   
    otp?: string;   
    DOB?:string
    otpVerified?: boolean;  
    enrolledPackage:number;
    enrolledDuration:string
    enrolledDurationExpire:string
    enrolledDate:string;
    address?: string;   
    state?: string;   
    district?: string;   
    pincode?: number;   
    reviews?: string[];   
    isBlocked?: boolean;
    coachId?:any;     
    isCoach: boolean;
    quizScore:Number;
    isApproved:string;
    role:string;
    isRegisted:boolean;
    Diet?: {
      Meal1: string | null;
      Meal2: string | null;
      Meal3: string | null;
    };
  } 