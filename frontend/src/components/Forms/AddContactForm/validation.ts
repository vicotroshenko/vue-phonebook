import { z } from 'zod';

const addContactSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(8, 'Phone must be at least 8 characters.'),
	favorite: z.boolean(),
});

export default addContactSchema;
