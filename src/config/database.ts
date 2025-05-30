import { PrismaClient } from '@prisma/client';

class DatabaseConnection{
    private static instance: PrismaClient | null = null;

    private constructor(){

    }

    public static getInstance(): PrismaClient {
        if(!DatabaseConnection.instance){
            DatabaseConnection.instance = new PrismaClient({
                log: ['query', 'info', 'warn', 'error'],
            });
        }
        return DatabaseConnection.instance;
    }

    public static async disconnect(): Promise<void>{
        if(DatabaseConnection.instance){
            await DatabaseConnection.instance.$disconnect();
            DatabaseConnection.instance = null;
        }
    }
}

export default DatabaseConnection;