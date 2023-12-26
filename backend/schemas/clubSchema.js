const z = require('zod');

const newClubSchema = z.object({
  name: z.string({ required_error: 'Club name is required' }).min(3).max(50),
  shortName: z.string().min(3).max(10).optional(),
  tla: z.string().min(3).max(5).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  founded: z.coerce
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  clubColors: z.string().optional(),
  venue: z.string().optional(),
  crestUrl: z.string().optional(),
});

function validateNewClub(club) {
  return newClubSchema.safeParse(club);
}

const updatedClubSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  shortName: z.string().min(3).max(10).optional(),
  tla: z.string().min(3).max(5).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  founded: z.coerce
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  clubColors: z.string().optional(),
  venue: z.string().optional(),
  crestUrl: z.string().optional(),
});

function validateUpdatedClub(club) {
  return updatedClubSchema.safeParse(club);
}

module.exports = { validateNewClub, validateUpdatedClub };
