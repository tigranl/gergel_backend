import { ApiService } from './api.service';
import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Request,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
} from '@nestjs/common';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
  ) {}
  @Get('choices')
  public async randomWords(@Query('word') query) {
    if (query) {
      return this.apiService.formChoices('rus', 'eng', query);
    } else {
      return [];
    }
  }
}
