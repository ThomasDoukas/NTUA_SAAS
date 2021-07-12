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
        @Headers() headers,
        @Res() response: Response
    ) {
        try {
            const result = await this.esbService.executeGetRequests(headers);
            console.log(result);
            response.send(result);
        }
        catch(err) {
            console.log(err);
            response.status(err.response.statusCode).send(err)
        }
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
        @Body() body,
        @Res() response: Response
    ) {
        try {
            const result = await this.esbService.executePostRequests(headers, body);
            console.log(result);
            response.send(result);
        }
        catch(err) {
            console.log(err);
            response.status(err.response.statusCode).send(err);
        }
    }

    /*
        Execute all delete requests
        users: deleteUser
        questions: deleteQuestion
        answers: deleteAnswer
    */
    @Delete()
    async executeDeleteRequests(
        @Headers() headers,
        @Res() response: Response
    ) {
        try {
            const result = await this.esbService.executeDeleteRequests(headers);
            console.log(result);
            response.send(result);
        }
        catch(err) {
            console.log(err);
            response.status(err.response.statusCode).send(err);
        }
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
        @Body() body,
        @Res() response: Response
    ) {
        try {
            const result = await this.esbService.executePatchRequests(headers, body);
            console.log(result);
            response.send(result);
        }
        catch(err) {
            console.log(err);
            response.status(err.response.statusCode).send(err);
        }
    }


}
