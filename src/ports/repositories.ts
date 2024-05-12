import { User } from '../domain/models/user.js';

export interface UserRepository {
    findById(id: number): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    create(email: string): Promise<User | null>;
}
