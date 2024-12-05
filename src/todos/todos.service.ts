import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entity/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todos)
        private readonly todosRepository: Repository<Todos>,
    ) { }


    async getAllTodos(): Promise<Todos[]> {
        return await this.todosRepository.find();
    }

    async getTodoById(id: number): Promise<Todos> {
        const todo = await this.todosRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }



    async createTodo(name: string, description: string): Promise<Todos> {
        const newTodo = this.todosRepository.create({
            name,
            description,
            status: false,
        });
        return await this.todosRepository.save(newTodo);
    }

    async updateTodo(
        id: number,
        name?: string,
        description?: string,
        status?: boolean,): Promise<Todos> {
        const todo = await this.getTodoById(id);

        if (name !== undefined) todo.name = name;
        if (description !== undefined) todo.description = description;
        if (status !== undefined) todo.status = status;
        return await this.todosRepository.save(todo);
    }

    async deleteTodoById(id: number): Promise<{ message: string }> {
        const result = await this.todosRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return {
            message: `Todo with ID ${id} deleted`
        };
    }

}
