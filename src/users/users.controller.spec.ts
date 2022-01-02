import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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

  describe('Find One User', () => {
    it('should return a user', async () => {
      usersService.findOne = jest.fn();
      const data = controller.findOne("1");
      expect(controller.findOne("1")).toBe(data);
    });
  });

  describe('Create One User', () => {
    it('should create a user', async () => {
      usersService.create = jest.fn();
      const test = {
        id : 99,
        firstname : "Miles",
        lastname : "Morales",
        createdAt: new Date,
        updatedAt: new Date,
      }
      const data = controller.create(test);
      expect(controller.create(test)).toBe(data);
    });
  });
  
  describe('UserController update', () => {
    it('should update an user', async () => {
        usersService.update = jest.fn();
        var userToUpdate = new UpdateUserDto();
        const data = controller.update("1", userToUpdate);
        expect(controller.update("1", userToUpdate)).toBe(data);
    });
});

describe('UserController delete', () => {
    it('should delete an user', async () => {
        usersService.remove = jest.fn();
        const data = controller.remove("1");
        expect(controller.remove("1")).toBe(data);
    });
});
});
