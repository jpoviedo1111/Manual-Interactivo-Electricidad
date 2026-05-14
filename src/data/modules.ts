import type { Module } from "@/types/content";
import { m1Conceptos } from "@/data/modules/m1-conceptos";
import { m2Circuitos } from "@/data/modules/m2-circuitos";
import { m3Conductores } from "@/data/modules/m3-conductores";
import { m4Esquemas } from "@/data/modules/m4-esquemas";
import { m5Protecciones } from "@/data/modules/m5-protecciones";
import { m6Instalacion } from "@/data/modules/m6-instalacion";
import { m7Seguridad } from "@/data/modules/m7-seguridad";

export const allModules: Module[] = [
  m1Conceptos,
  m2Circuitos,
  m3Conductores,
  m4Esquemas,
  m5Protecciones,
  m6Instalacion,
  m7Seguridad,
];

export function getModule(id: string): Module | undefined {
  return allModules.find((m) => m.id === id);
}

export function getLesson(moduleId: string, lessonId: string) {
  return getModule(moduleId)?.lessons.find((l) => l.id === lessonId);
}
