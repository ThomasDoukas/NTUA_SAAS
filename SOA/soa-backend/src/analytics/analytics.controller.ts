import { Controller, Get, Post, Body, UseGuards, Request} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { SearchQuestionDto } from './dto/search-question.dto';

@Controller('saas/soa/analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) { }

	// Get Daily Contribution for Statistics
    @UseGuards(JwtAuthGuard)
	@Post('/myContr')
	findDailyContribution(
        @Body() searchQuestionDto: SearchQuestionDto,
        @Request() req
    ) {
		return this.analyticsService.findDailyContribution(searchQuestionDto, req.user);
	}

    // Get Questions under specific label for Statistics
	@Get('/labelQuestions')
    findLabelQuestions(){
        return this.analyticsService.findLabelQuestions();
    }

    // Get Date Questions for Statistics
    @Post('/dateQuestions')
    findDateQuestions(@Body() searchQuestionDto: SearchQuestionDto){
        return this.analyticsService.findDateQuestions(searchQuestionDto);
    }
}
