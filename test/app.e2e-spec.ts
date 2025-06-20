import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateWorkoutDayDto } from '../src/workoutday/dto/create-workoutday.dto';
import { EditWorkoutDayDto } from '../src/workoutday/dto';
import { Exercise } from '@prisma/client';
import { CreateExerciseDto } from '../src/exercise/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    // Initialize the application, connect to the database, etc.
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    // Close the application and clean up resources
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'steph@gmail.com',
      password: '123',
    };
    // Signup Tests
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    it('should throw if email already exists', () => {
      return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(403);
    });

    //Signin Tests
    describe('Signin', () => {
      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Steph',
          email: 'curryoverbron@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });

    describe('Delete user', () => {});
  });

  describe('WorkoutDay', () => {
    describe('Create workout day', () => {
      const dto: CreateWorkoutDayDto = {
        title: 'Leg Day June 20',
      };
      it('Should create a workout day', () => {
        return pactum
          .spec()
          .post('/workoutday')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.title)
          .stores('workoutDayId', 'id');
      });
    });

    describe('Get workout days', () => {
      it('should get workout days', () => {
        return pactum
          .spec()
          .get('/workoutday')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get workout day by id', () => {
      it('should get workoutd day by id', () => {
        return pactum
          .spec()
          .get('/workoutday/{id}')
          .withPathParams('id', '$S{workoutDayId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Edit workout day by id', () => {
      const dto: EditWorkoutDayDto = {
        title: 'Leg Day June 21',
      };
      it('should edit workout day by id', () => {
        return pactum
          .spec()
          .patch('/workoutday/{id}')
          .withPathParams('id', '$S{workoutDayId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Delete workout day by id', () => {
      it('should delete orkoutday by id', () => {
        return pactum
          .spec()
          .delete('/workoutday/{id}')
          .withPathParams('id', '$S{workoutDayId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(204)
          .inspect();
      });
    });

    describe('Create workout day again to use for exercises', () => {
      const dto: CreateWorkoutDayDto = {
        title: 'Leg Day June 20',
      };
      it('Should create a workout day', () => {
        return pactum
          .spec()
          .post('/workoutday')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.title)
          .stores('workoutDayId', 'id');
      });
    });
  });

  describe('Exercise', () => {
    describe('Create exercise', () => {
      const dto: CreateExerciseDto = {
        title: 'Squat',
      };
      it('should create an exercise', () => {
        return pactum
          .spec()
          .post('/workoutday/{id}/exercise')
          .withPathParams('id', '$S{workoutDayId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.title)
          .stores('exerciseId', 'id');
      });
    });

    describe('Get exercises', () => {
      it('should get exercises', () => {
        return pactum
          .spec()
          .get('/workoutday/{id}/exercise')
          .withPathParams('id', '$S{workoutDayId}')
          .withHeaders({ Authorization : ' Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1)
          .inspect();
    });
    });

    describe('Get exercise by id', () => {});

    describe('Edit exercise', () => {});

    describe('Delete exercise', () => {});
  });

  describe('ExerciseSet', () => {
    describe('Create exercise set', () => {});

    describe('Get exercise sets', () => {});

    describe('Get exercise set by id', () => {});

    describe('Edit exercise set', () => {});

    describe('Delete exercise set', () => {});
  });
});
