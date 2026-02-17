
import { atom } from 'nanostores';
import type { User } from '../types/User'; // Will create this type

// Mock user data
export const user = atom<User>({
    id: '1',
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
});

export const date = atom<Date>(new Date());
