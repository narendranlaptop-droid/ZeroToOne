import type { User } from './types';

export const users: User[] = [
  // Admin
  { id: 'admin-01', name: 'Admin', email: 'Admin@zero.com', password: 'Admin@123', role: 'admin', employeeId: 'E-001' },

  // Students
  { id: 'student-01', name: 'Krishna Sai', email: 'krishnasai@zero.com', password: 'krishnasai@123', role: 'student', employeeId: '17250' },
  { id: 'student-02', name: 'Vignesh Nayar', email: 'vigneshnayar@zero.com', password: 'vigneshnayar@123', role: 'student', employeeId: '17251' },
  { id: 'student-03', name: 'Abdullakhan Patan', email: 'abdullakhanpatan@zero.com', password: 'abdullakhanpatan@123', role: 'student', employeeId: '17252' },
  { id: 'student-04', name: 'Akshaya Gayatri', email: 'akshayagayatri@zero.com', password: 'akshayagayatri@123', role: 'student', employeeId: '17253' },
  { id: 'student-05', name: 'Meghana', email: 'meghana@zero.com', password: 'meghana@123', role: 'student', employeeId: '17254' },
  { id: 'student-06', name: 'Ayush Purohit', email: 'ayushpurohit@zero.com', password: 'ayushpurohit@123', role: 'student', employeeId: '17255' },
  { id: 'student-07', name: 'Aditya Patel', email: 'adityapatel@zero.com', password: 'adityapatel@123', role: 'student', employeeId: '17256' },
  { id: 'student-08', name: 'Parimi Anil Babu', email: 'parimianilbabu@zero.com', password: 'parimianilbabu@123', role: 'student', employeeId: '17257' },
  { id: 'student-09', name: 'Narendran', email: 'narendran@zero.com', password: 'narendran@123', role: 'student', employeeId: '17258' },
  { id: 'student-10', name: 'Azim Ahamed', email: 'azimahamed@zero.com', password: 'azimahamed@123', role: 'student', employeeId: '17259' },
  { id: 'student-11', name: 'Ramkumar', email: 'ramkumar@zero.com', password: 'ramkumar@123', role: 'student', employeeId: '17260' },
  { id: 'student-12', name: 'Sreekar', email: 'sreekar@zero.com', password: 'sreekar@123', role: 'student', employeeId: '17261' },
  { id: 'student-13', name: 'Vyshnavi', email: 'vyshnavi@zero.com', password: 'vyshnavi@123', role: 'student', employeeId: '17262' },
  { id: 'student-14', name: 'Manchu Sana', email: 'manchusana@zero.com', password: 'manchusana@123', role: 'student', employeeId: '17263' },
  { id: 'student-15', name: 'Santhi Murthy', email: 'santhimurthy@zero.com', password: 'santhimurthy@123', role: 'student', employeeId: '17264' },
  { id: 'student-16', name: 'Sowjanya MR', email: 'sowjanyamr@zero.com', password: 'sowjanyamr@123', role: 'student', employeeId: '17265' },
  { id: 'student-17', name: 'Banala Deekshitha', email: 'banaladeekshitha@zero.com', password: 'banaladeekshitha@123', role: 'student', employeeId: '17266' },
  { id: 'student-18', name: 'Badam Vaishnavi Reddy', email: 'badamvaishnavireddy@zero.com', password: 'badamvaishnavireddy@123', role: 'student', employeeId: '17267' },

  // Scorer
  { id: 'scorer-01', name: 'Scorer One', email: 'scorer@zero.com', password: 'scorer@123', role: 'scorer', employeeId: 'E-002' },

  // Operators
  { id: 'operator-01', name: 'Operator One', email: 'operator1@zero.com', password: 'operator1@123', role: 'operator', employeeId: 'E-003' },
  { id: 'operator-02', name: 'Operator Two', email: 'operator2@zero.com', password: 'operator2@123', role: 'operator', employeeId: 'E-004' },
];
