import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from './entity/todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    async getAllTodos(): Promise<Todos[]> {
        try {
            return await this.todosService.getAllTodos();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getTodoById(@Param('id') id: number): Promise<Todos> {
        try {
            return await this.todosService.getTodoById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }


    @Post()
    async createTodo(
        @Body() createTodoDto: CreateTodoDto,
    ): Promise<Todos> {
        try {
            return await this.todosService.createTodo(createTodoDto.name, createTodoDto.description);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body() updateTodoDto: UpdateTodoDto, 
    ): Promise<Todos> {
        try {
            return await this.todosService.updateTodo(id, updateTodoDto.name, updateTodoDto.description, updateTodoDto.status);
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number): Promise<{message: string }> {
        try {
            return await this.todosService.deleteTodoById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

}
