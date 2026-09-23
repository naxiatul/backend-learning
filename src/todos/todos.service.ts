import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn NestJS', done: false },
    { id: 2, title: 'Learn React', done: false },
  ];
  private nextId = 3;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = { id: this.nextId++, title: dto.title, done: false };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.done !== undefined) todo.done = dto.done;
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    this.todos.splice(index, 1);
  }
}
