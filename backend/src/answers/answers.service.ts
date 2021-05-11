import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
    constructor(@InjectEntityManager('questionsConnection') private manager: EntityManager) { }

    async createAnswer(createAnswerDto: CreateAnswerDto) {
        return 'This action adds a new answer';
    }

    async findAllAnswers() {
        return `This action returns all answers`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} answer`;
    }

    async update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return `This action updates a #${id} answer`;
    }

    async remove(id: number) {
        return `This action removes a #${id} answer`;
    }
}
