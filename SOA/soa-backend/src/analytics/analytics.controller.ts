import { Controller, Get, Post, Body, UseGuards, Request} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { ContributionDto } from './dto/contribution.dto';
import { SearchQuestionDto } from './dto/search-question.dto';

@Controller('saas/soa/analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) { }

	// Get Daily Contribution for Statistics
    @UseGuards(JwtAuthGuard)
	@Post('/myContr')
	findDailyContribution(
        @Body() contributionDto: ContributionDto,
        @Request() req
    ) {
		return this.analyticsService.findDailyContribution(contributionDto, req.user);
	}

    // Get Questions under specific label for Statistics
	@Get('/labelQuestions')
    findLabelQuestions(){
        return this.analyticsService.findLabelQuestions();
    }

    // Get Date Questions for Statistics
    @Post('/dateQuestions')
    findDateQuestions(@Body() contributionDto: ContributionDto){
        return this.analyticsService.findDateQuestions(contributionDto);
    }
}
