import { DescarteModule } from './descarte/descarte.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DescarteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
