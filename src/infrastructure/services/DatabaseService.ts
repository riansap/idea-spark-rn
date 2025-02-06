import SQLite from 'react-native-sqlite-storage';

// Enable SQLite Promises
SQLite.enablePromise(true);

// Task type definition
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    createdAt: Date;
    category: string;
    status: 'new' | 'done';
    deleted: boolean;
}

// Database configuration
const DATABASE = {
    name: 'ideaspark.db',
    version: '1.0',
    displayName: 'IdeaSpark Tasks Database',
    size: 200000,
};

export class DatabaseService {
    private static instance: DatabaseService;
    private database: SQLite.SQLiteDatabase | null = null;
    private initialized = false;
    private initializationPromise: Promise<void> | null = null;

    private constructor() { }

    static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async initialize(): Promise<void> {
        if (this.initialized) return;
        if (this.initializationPromise) return this.initializationPromise;

        this.initializationPromise = (async () => {
            try {
                this.database = await SQLite.openDatabase(DATABASE);
                await this.createTables();
                this.initialized = true;
                console.log('Database initialized successfully');
            } catch (error) {
                this.initialized = false;
                this.database = null;
                console.error('Database initialization error:', error);
                throw error;
            } finally {
                this.initializationPromise = null;
            }
        })();

        return this.initializationPromise;
    }

    private async createTables(): Promise<void> {
        if (!this.database) throw new Error('Database not initialized');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                due_date TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                category TEXT NOT NULL,
                status TEXT NOT NULL CHECK(status IN ('new', 'done')),
                deleted BOOLEAN DEFAULT 0
            )
        `;

        try {
            await this.database.executeSql(createTableQuery);
        } catch (error) {
            console.error('Error creating tables:', error);
            throw new Error(`Failed to create tables: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static validateTask(task: Partial<Task>): boolean {
        if (!task.title?.trim()) {
            throw new Error('Task title is required');
        }
        if (!task.description?.trim()) {
            throw new Error('Task description is required');
        }
        if (!task.dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) {
            throw new Error('Invalid due date format. Use YYYY-MM-DD');
        }
        return true;
    }

    async createTask(task: Omit<Task, 'id' | 'deleted'>): Promise<Task> {
        if (!this.database) throw new Error('Database not initialized');

        DatabaseService.validateTask(task);
        const id = Date.now().toString();
        const createdAt = new Date();

        const query = 'INSERT INTO tasks (id, title, description, due_date, created_at, category, status, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, 0)';
        const params = [id, task.title.trim(), task.description.trim(), task.dueDate, createdAt.getTime(), task.category || 'uncategorized', task.status || 'new'];

        try {
            await this.database.executeSql(query, params);
            return { ...task, id, createdAt, deleted: false };
        } catch (error) {
            console.error('Error creating task:', error);
            throw new Error(`Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getAllTasks(filters?: { category?: string; status?: 'new' | 'done'; includeDeleted?: boolean }): Promise<Task[]> {
        if (!this.initialized) {
            await this.initialize();
        }
        
        if (!this.database) {
            throw new Error('Database failed to initialize');
        }
    
        let query = 'SELECT * FROM tasks WHERE 1=1';
        const params: any[] = [];

        if (!filters?.includeDeleted) {
            query += ' AND deleted = 0';
        }

        if (filters?.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        if (filters?.status) {
            query += ' AND status = ?';
            params.push(filters.status);
        }

        query += ' ORDER BY created_at DESC';

        try {
            const [results] = await this.database.executeSql(query, params);
            const tasks: Task[] = [];

            for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);
                tasks.push({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    dueDate: row.due_date,
                    createdAt: new Date(row.created_at),
                    category: row.category,
                    status: row.status,
                    deleted: Boolean(row.deleted)
                });
            }

            return tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw new Error(`Failed to fetch tasks: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async updateTask(task: Task): Promise<void> {
        if (!this.database) throw new Error('Database not initialized');

        DatabaseService.validateTask(task);
        const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?';
        const params = [task.title.trim(), task.description.trim(), task.dueDate, task.id];

        try {
            const [result] = await this.database.executeSql(query, params);
            if (result.rowsAffected === 0) {
                throw new Error('Task not found');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error(`Failed to update task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async toggleTaskDeletion(taskId: string): Promise<void> {
        if (!this.database) throw new Error('Database not initialized');

        const query = 'UPDATE tasks SET deleted = NOT deleted WHERE id = ?';
        const params = [taskId];

        try {
            const [result] = await this.database.executeSql(query, params);
            if (result.rowsAffected === 0) {
                throw new Error('Task not found');
            }
        } catch (error) {
            console.error('Error toggling task deletion:', error);
            throw new Error(`Failed to toggle task deletion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export const database = DatabaseService.getInstance();