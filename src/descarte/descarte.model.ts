export interface PontoDescarte {
  id: number;
  nomeLocal: string;
  bairro: string;
  tipoLocal: 'publico' | 'privado';
  categoriasAceitas: string[];
  latitude: number;
  longitude: number;
}

export interface RegistroDescarte {
  id: number;
  usuario: string;
  pontoId: number;
  tipoResiduo: string;
  data: Date;
}