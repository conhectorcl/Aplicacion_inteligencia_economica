# CLARUS - Inteligencia Económica para Decisiones Empresariales

CLARUS es un prototipo funcional construido con React, JavaScript y Supabase para apoyar decisiones empresariales con foco en pricing, alertas económicas y reportería ejecutiva.

## Objetivo del prototipo

Mostrar una experiencia realista de una plataforma que:
- consulta indicadores económicos
- evalúa impacto empresarial
- recomienda ajustes de precio
- genera alertas ejecutivas
- prepara reportes exportables

## Stack

- React
- JavaScript
- Vite
- Supabase
- Edge Functions
- SQL para tablas y seed

## Estructura

- `src/data`: datos mock para prototipo
- `src/services`: acceso a datos y lógica de negocio
- `src/hooks`: encapsula llamadas y estado
- `src/context`: estado global de autenticación y negocio
- `supabase/functions`: funciones edge
- `supabase/migrations`: estructura de base de datos

## Ejecutar local

```bash
npm install
npm run dev