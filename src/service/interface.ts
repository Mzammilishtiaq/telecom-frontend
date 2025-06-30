export interface StorageI{
    id: string;
    name: string;
    email:string;
    role: 'admin' | 'user' | 'client' | string;
    data:object;
    userType: 'individual' | 'business' | string;
    token:string;
    meta: Record<string, unknown>;
}
