import { Controller, Get, Post, Body} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SearchQuestionDto } from './dto/search-question.dto';

@Controller('saas/soa/analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) { }

	// Get Daily Contribution for Statistics
	@Post('/myContr')
	findDailyContribution(@Body() searchQuestionDto: SearchQuestionDto) {
		return this.analyticsService.findDailyContribution(searchQuestionDto);
	}

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
