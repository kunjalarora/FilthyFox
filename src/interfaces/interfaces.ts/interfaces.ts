export interface House {
  id: number;
  name: string;
  users: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string | null;
  tasks: Task[];
  houseId: string;
  house: House | null;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate: Date;
  isRecurring: boolean;
  recursiveTime: number | null;
  isUrgent: boolean;
  userId: number;
  user: User | null;
}
