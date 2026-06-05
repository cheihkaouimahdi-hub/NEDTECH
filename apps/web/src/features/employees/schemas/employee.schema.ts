import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  LastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  phone: z.string().min(1, 'Phone is required'),
  role: z.enum(['EMPLOYEE', 'ADMIN'], { required_error: 'Role is required' }),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
