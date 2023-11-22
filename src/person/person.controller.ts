import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('find')
  findQuery(@Query('name') name: string) {
    return `请求${name}信息`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Post('create')
  createPerson(@Body() person: CreatePersonDto) {
    return `received: ${JSON.stringify(person)}`;
  }

  @Post('formData')
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/' }))
  testFormData(
    @Body() person: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(person)}`;
  }
}
