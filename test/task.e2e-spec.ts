import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TaskDocument } from '../src/task/schemas/task.schema';
import {AppModule} from "../src/app.module";
import {CreateTaskDto} from "../src/task/dto/create-task.dto";
import {UpdateTaskDto} from "../src/task/dto/update-task.dto";
import {CompleteTaskDto} from "../src/task/dto/complete-task.dto";

const taskApiPath = '/tasks';

describe('TaskController (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;
    let taskId: string;
    let task: TaskDocument;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule.forRoot(mongoUri), AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        await app.close();
    });

    it('POST /tasks - should create a new task', async () => {
        const createTaskDto: CreateTaskDto = {
            name: 'Test Task',
            description: 'Test Description',
        };

        const response = await request(app.getHttpServer()).post(taskApiPath).send(createTaskDto).expect(201);

        expect(response.body.name).toBe(createTaskDto.name);
        expect(response.body.description).toBe(createTaskDto.description);
        taskId = response.body._id;
        task = response.body as TaskDocument;
    });

    it('GET /tasks - should return all tasks', async () => {
        const response = await request(app.getHttpServer()).get(taskApiPath).expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].name).toEqual(task.name);
    });

    it('GET /tasks/:id - should return a task by ID', async () => {
        const response = await request(app.getHttpServer()).get(`${taskApiPath}/${taskId}`).expect(200);

        expect(response.body._id).toBe(taskId);
        expect(response.body.name).toBe(task.name);
    });

    it('PATCH /tasks/:id - should update the task', async () => {
        const updateTaskDto: UpdateTaskDto = {
            name: 'Updated Task',
            description: 'Updated Description',
        };

        const response = await request(app.getHttpServer())
            .patch(`${taskApiPath}/${taskId}`)
            .send(updateTaskDto)
            .expect(200);

        expect(response.body.name).toBe(updateTaskDto.name);
        expect(response.body.description).toBe(updateTaskDto.description);
    });

    it('PATCH /tasks/:id/done - should mark the task as completed', async () => {
        const completeTaskDto: CompleteTaskDto = {
            completed: true,
        };

        const response = await request(app.getHttpServer())
            .patch(`${taskApiPath}/${taskId}/done`)
            .send(completeTaskDto)
            .expect(200);

        expect(response.body.completed).toBe(true);
    });

    it('DELETE /tasks/:id - should delete the task', async () => {
        await request(app.getHttpServer()).delete(`${taskApiPath}/${taskId}`).expect(200);

        await request(app.getHttpServer()).get(`${taskApiPath}/${taskId}`).expect(404);
    });
});