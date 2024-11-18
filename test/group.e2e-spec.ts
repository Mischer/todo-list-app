import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GroupDocument } from '../src/group/schemas/group.schema';
import { faker } from '@faker-js/faker';
import {CreateGroupDto} from "../src/group/dto/create-group.dto";
import {AppModule} from "../src/app.module";

const groupApiPath = '/groups';

describe('groupController (e2e)', () => {
	let app: INestApplication;
	let mongoServer: MongoMemoryServer;
	let groupId: string;
	let group: GroupDocument;

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
		// Stop the in-memory MongoDB server
		await mongoose.disconnect();
		await mongoServer.stop();
		await app.close();
	});

	it('POST /groups - should create a new group', async () => {
		const createGroupDto: CreateGroupDto = {
			name: faker.company.name(),
		};

		const response = await request(app.getHttpServer()).post(groupApiPath).send(createGroupDto).expect(201);

		expect(response.body.name).toBe(createGroupDto.name);
		groupId = response.body._id;
		group = response.body as GroupDocument;
	});

	it('GET /groups - should return all groups', async () => {
		const response = await request(app.getHttpServer()).get(groupApiPath).expect(200);

		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toEqual(1);
		expect(response.body[0]).toEqual(group);
	});

	it('GET /groups/:id - should return a group by ID', async () => {
		const response = await request(app.getHttpServer()).get(`${groupApiPath}/${groupId}`).expect(200);

		expect(response.body._id).toBe(groupId);
		expect(response.body.name).toBe(group.name);
	});

	it('DELETE /groups/:id - should delete the group', async () => {
		await request(app.getHttpServer()).delete(`${groupApiPath}/${groupId}`).expect(200);

		await request(app.getHttpServer()).get(`${groupApiPath}/${groupId}`).expect(404);
	});
});
