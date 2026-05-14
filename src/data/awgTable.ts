export interface AwgEntry {
  awg: string;
  seccionMm2: number;
  diametroMm: number;
  capTW60: number;   // Ampacity TW @ 60°C
  capTHW75: number;  // Ampacity THW @ 75°C
  usoTipico: string;
}

export const AWG_TABLE: AwgEntry[] = [
  { awg: "22",  seccionMm2: 0.32,  diametroMm: 0.64,  capTW60: 3,   capTHW75: 3,   usoTipico: "Señalización, MBT" },
  { awg: "18",  seccionMm2: 0.82,  diametroMm: 1.02,  capTW60: 7,   capTHW75: 10,  usoTipico: "Control, electrónica" },
  { awg: "16",  seccionMm2: 1.31,  diametroMm: 1.29,  capTW60: 13,  capTHW75: 15,  usoTipico: "Iluminación pequeña" },
  { awg: "14",  seccionMm2: 2.08,  diametroMm: 1.63,  capTW60: 20,  capTHW75: 20,  usoTipico: "Iluminación domiciliaria" },
  { awg: "12",  seccionMm2: 3.31,  diametroMm: 2.05,  capTW60: 25,  capTHW75: 25,  usoTipico: "Tomacorrientes generales" },
  { awg: "10",  seccionMm2: 5.26,  diametroMm: 2.59,  capTW60: 30,  capTHW75: 35,  usoTipico: "Ducha, cargas especiales" },
  { awg: "8",   seccionMm2: 8.37,  diametroMm: 3.26,  capTW60: 40,  capTHW75: 50,  usoTipico: "Seccional domicilio medio" },
  { awg: "6",   seccionMm2: 13.30, diametroMm: 4.11,  capTW60: 55,  capTHW75: 65,  usoTipico: "Seccional domicilio grande" },
  { awg: "4",   seccionMm2: 21.15, diametroMm: 5.19,  capTW60: 70,  capTHW75: 85,  usoTipico: "Alimentador local / oficina" },
  { awg: "2",   seccionMm2: 33.62, diametroMm: 6.54,  capTW60: 95,  capTHW75: 115, usoTipico: "Edificio mediano" },
  { awg: "1/0", seccionMm2: 53.49, diametroMm: 8.25,  capTW60: 125, capTHW75: 150, usoTipico: "Acometida principal" },
  { awg: "2/0", seccionMm2: 67.43, diametroMm: 9.27,  capTW60: 145, capTHW75: 175, usoTipico: "Acometida industrial" },
  { awg: "4/0", seccionMm2: 107.2, diametroMm: 11.68, capTW60: 195, capTHW75: 230, usoTipico: "Grandes feeders" },
];

export function awgRecomendadoParaCorriente(I: number, useTHW = false): AwgEntry | undefined {
  const cap = (a: AwgEntry) => (useTHW ? a.capTHW75 : a.capTW60);
  const margen = I * 1.25;
  return AWG_TABLE.find((a) => cap(a) >= margen);
}
