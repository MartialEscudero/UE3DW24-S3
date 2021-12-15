import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide : getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      usersService.findAll = jest.fn();
      const data = controller.findAll();
      expect(controller.findAll()).toBe(data);
    });
  });
  
});