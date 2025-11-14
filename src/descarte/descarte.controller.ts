import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DescarteService } from './descarte.service';

@Controller('descarte')
export class DescarteController {
  constructor(private readonly descarteService: DescarteService) {}

  @Post('ponto')
  createPonto(@Body() body) {
    return this.descarteService.createPonto(body);
  }

  @Post('registro')
  registrar(@Body() body) {
    return this.descarteService.registrarDescarte(body);
  }

  @Get('historico')
  consultar(@Query() filtros) {
    return this.descarteService.consultarHistorico(filtros);
  }

  @Get('relatorio')
  relatorio() {
    return this.descarteService.relatorio();
  }
}