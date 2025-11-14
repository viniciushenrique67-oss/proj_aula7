import { Injectable } from '@nestjs/common';
import { PontoDescarte, RegistroDescarte } from './descarte.model';

@Injectable()
export class DescarteService {
  private pontos: PontoDescarte[] = [];
  private registros: RegistroDescarte[] = [];

  private idPonto = 1;
  private idRegistro = 1;

  createPonto(data: Omit<PontoDescarte, 'id'>) {
    const novoPonto: PontoDescarte = {
      id: this.idPonto++,
      ...data,
    };

    this.pontos.push(novoPonto);
    return novoPonto;
  }

  registrarDescarte(data: Omit<RegistroDescarte, 'id' | 'data'>) {
    const novoRegistro: RegistroDescarte = {
      id: this.idRegistro++,
      data: new Date(),
      ...data,
    };

    this.registros.push(novoRegistro);
    return novoRegistro;
  }

  consultarHistorico(filtros: any) {
    return this.registros.filter((item) => {
      return (
        (!filtros.usuario || item.usuario === filtros.usuario) &&
        (!filtros.tipoResiduo || item.tipoResiduo === filtros.tipoResiduo) &&
        (!filtros.pontoId || item.pontoId == filtros.pontoId)
      );
    });
  }

  relatorio() {
    const totalRegistros = this.registros.length;

    const contagemPorPonto = this.registros.reduce((acc, r) => {
      acc[r.pontoId] = (acc[r.pontoId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const pontoMaisUsado =
      Object.keys(contagemPorPonto).length > 0
        ? Number(
            Object.keys(contagemPorPonto).reduce((a, b) =>
              contagemPorPonto[a] > contagemPorPonto[b] ? a : b
            )
          )
        : null;

    const contagemResiduo = this.registros.reduce((acc, r) => {
      acc[r.tipoResiduo] = (acc[r.tipoResiduo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const residuoMaisDescartado =
      Object.keys(contagemResiduo).length > 0
        ? Object.keys(contagemResiduo).reduce((a, b) =>
            contagemResiduo[a] > contagemResiduo[b] ? a : b
          )
        : null;

    const hoje = new Date();
    const dias30 = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);

    const ultimos30 = this.registros.filter((r) => r.data >= dias30);
    const mediaUltimos30 = ultimos30.length / 30;

    return {
      totalRegistros,
      pontoComMaisRegistros: pontoMaisUsado,
      residuoMaisDescartado,
      mediaRegistrosUltimos30dias: Number(mediaUltimos30.toFixed(2)),
      totalUsuarios: new Set(this.registros.map((r) => r.usuario)).size,
      totalPontos: this.pontos.length,
    };
  }
}