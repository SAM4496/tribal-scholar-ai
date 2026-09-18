// Demo credential store for the prototype.
//
// The real product would verify against the `User` table in Prisma/Postgres.
// This prototype ships with the same demo accounts that prisma/seed.ts would
// create, verified with bcrypt, plus an in-memory registry for self-registered
// accounts. Registered users are not persisted between server restarts.

import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

const SALT_ROUNDS = 10;
const DEMO_PASSWORD = 'demo1234';

const DEMO_ACCOUNT_SEED: Array<Omit<DemoUser, 'passwordHash'>> = [
  {
    id: 'user-admin',
    name: 'Anita Patel',
    email: 'admin@demo.com',
    role: 'ADMIN',
  },
  {
    id: 'user-scrutiny',
    name: 'Priya Sharma',
    email: 'scrutiny@demo.com',
    role: 'SCRUTINY_OFFICER',
  },
  {
    id: 'user-selection',
    name: 'Vikram Singh',
    email: 'selection@demo.com',
    role: 'SELECTION_OFFICER',
  },
  {
    id: 'user-applicant',
    name: 'Rahul Kumar',
    email: 'applicant@demo.com',
    role: 'APPLICANT',
  },
];

let demoUsersPromise: Promise<DemoUser[]> | null = null;

function loadDemoUsers(): Promise<DemoUser[]> {
  if (!demoUsersPromise) {
    demoUsersPromise = (async () => {
      const hash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);
      return DEMO_ACCOUNT_SEED.map((account) => ({
        ...account,
        passwordHash: hash,
      }));
    })();
  }
  return demoUsersPromise;
}

const registeredUsers = new Map<string, DemoUser>();

export async function findUserByEmail(
  email: string
): Promise<DemoUser | undefined> {
  const normalized = email.trim().toLowerCase();
  const registered = registeredUsers.get(normalized);
  if (registered) return registered;

  const demoUsers = await loadDemoUsers();
  return demoUsers.find((u) => u.email === normalized);
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<DemoUser | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return user;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<DemoUser> {
  const email = input.email.trim().toLowerCase();
  if (await findUserByEmail(email)) {
    throw new Error('EMAIL_TAKEN');
  }
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user: DemoUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email,
    passwordHash,
    role: 'APPLICANT',
  };
  registeredUsers.set(email, user);
  return user;
}