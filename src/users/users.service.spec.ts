import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide : getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          }
        },
        UsersRepository,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UsersService.findAll', () => {
    it('should return an array of users', async () => {
      service.findAll = jest.fn();
      expect(service.findAll);
    });
  });

  describe('UsersService.create', () => {
    it('should create a user', async () => {
      service.create = jest.fn();
      const test = {
        id : 99,
        firstname : "Miles",
        lastname : "Morales",
        createdAt: new Date,
        updatedAt: new Date,
      }
      expect(service.create(test));
    });
  });
  
});
