import { Body, Controller, Get, Headers, Post, Delete, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { EsbService } from './esb.service';

@Controller('saas/soa/esb/')
export class EsbController {
    constructor(private readonly esbService: EsbService) { }

    @Get('discover')
    async serviceDiscovery() {
        const result = await this.esbService.serviceDiscovery();
        return result;
    }

    /*  
    Execute all get requests
    Pass destination in headers[url-destination]
    users: findAllUsers, findOneUser
        questions: findLabelQuestions, findOneQuestion
        answers: findAllAnswers, findOneAnswer
        auth: -
        */
    @Get()
    async executeGetRequests(
        @Headers() headers
    ) {
        const result = await this.esbService.executeGetRequests(headers);
        return result
    }

    /*
        Execute all post requests
        users: createUser
        questions: createQuestion, searchQuestions, findDailyContribution, findUserQuestion, findDateQuestions
        answers: createAnswer, findUserAnswers
        auth: logIn, signUp
    */
    @Post()
    async executePostRequests(
        @Headers() headers,
        @Body() body) {
        const result = await this.esbService.executePostRequests(headers, body);
        return result
    }

    /*
        Execute all delete requests
        users: deleteUser
        questions: deleteQuestion
        answers: deleteAnswer
    */
    @Delete()
    async executeDeleteRequests(
        @Headers() headers
    ) {
        const result = await this.esbService.executeDeleteRequests(headers);
        return result;
    }

    /*
        Execute all patch requests
        users: updateUser
        question: updateQuestion
        answers: updateAnswer
    */
    @Patch()
    async executePatchRequests(
        @Headers() headers,
        @Body() body
    ) {
        const result = await this.esbService.executePatchRequests(headers, body);
        return result;
    }


}
