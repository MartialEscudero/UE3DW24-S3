import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

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
    
    usersRepository = module.get<UsersRepository>(UsersRepository);
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

  describe('UsersService.findOne', () => {
    it('should return a user', async () => {
      service.findOne = jest.fn();
      expect(service.findOne(1));
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

  describe('UserService.update ', () => {
    it('should update an user', async () => {
        UsersRepository.update = jest.fn();
        var userToUpdate = new UpdateUserDto;
        const data = service.update(1, userToUpdate);
        expect(service.update(1, userToUpdate)).toBe(data);
    });
  });

  describe('UserService.remove ', () => {
    it('should delete an user', async () => {
        UsersRepository.delete = jest.fn();
        service.remove = jest.fn();
        expect(service.remove(1));
    });
  });
});
