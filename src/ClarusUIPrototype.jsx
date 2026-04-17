import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, ArrowUpRight, Bell, Calendar, CircleDollarSign, Filter, LineChart, Package, Search, TrendingUp, Wallet, Zap } from 'lucide-react';
import { ResponsiveContainer, LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const macroSeries = [
  { mes: 'Ene', ipc: 0.7, tpm: 5.0, usd: 920 },
  { mes: 'Feb', ipc: 0.5, tpm: 5.25, usd: 938 },
  { mes: 'Mar', ipc: 0.6, tpm: 5.5, usd: 955 },
  { mes: 'Abr', ipc: 0.4, tpm: 5.5, usd: 948 },
  { mes: 'May', ipc: 0.3, tpm: 5.75, usd: 970 },
  { mes: 'Jun', ipc: 0.6, tpm: 6.0, usd: 982 },
];

const pricingProducts = [
  { sku: 'A-101', producto: 'Aceite Premium 1L', costo: 2450, precioActual: 3490, precioSugerido: 3790, margen: '29%', impacto: 'Alto' },
  { sku: 'B-220', producto: 'Harina Integral 1kg', costo: 980, precioActual: 1590, precioSugerido: 1690, margen: '22%', impacto: 'Medio' },
  { sku: 'C-315', producto: 'Café Importado 250g', costo: 3890, precioActual: 5490, precioSugerido: 5990, margen: '18%', impacto: 'Crítico' },
  { sku: 'D-410', producto: 'Galletas Avena', costo: 720, precioActual: 1290, precioSugerido: 1290, margen: '30%', impacto: 'Bajo' },
];

const alerts = [
  {
    title: 'Presión sobre costos importados',
    description: 'El alza del dólar aumenta riesgo de caída de margen en productos importados.',
    severity: 'crítico',
    action: 'Revisar precios en líneas dolarizadas',
  },
  {
    title: 'Costo de financiamiento en aumento',
    description: 'TPM alta mantiene presión sobre líneas de crédito y compras financiadas.',
    severity: 'alto',
    action: 'Reducir compra financiada y priorizar rotación',
  },
  {
    title: 'IPC controlado, espacio selectivo',
    description: 'Inflación moderada permite ajustes por categoría sin mover todo el catálogo.',
    severity: 'medio',
    action: 'Aplicar pricing segmentado',
  },
];

const decisionCards = [
  {
    title: 'Precio',
    subtitle: 'Qué conviene hacer este mes',
    value: 'Subir selectivamente',
    delta: '+3,8% sugerido',
    icon: CircleDollarSign,
  },
  {
    title: 'Margen proyectado',
    subtitle: 'Con ajustes recomendados',
    value: '24,7%',
    delta: '+2,1 pts',
    icon: TrendingUp,
  },
  {
    title: 'Riesgo financiero',
    subtitle: 'Sensibilidad a TPM',
    value: 'Medio / Alto',
    delta: 'Vigilancia semanal',
    icon: Wallet,
  },
  {
    title: 'Exposición dólar',
    subtitle: 'SKUs con mayor impacto',
    value: '18 productos',
    delta: '5 críticos',
    icon: Package,
  },
];

const impactData = [
  { name: 'Importados', impacto: 92 },
  { name: 'Masivos', impacto: 64 },
  { name: 'Premium', impacto: 78 },
  { name: 'Marca propia', impacto: 34 },
];

function SeverityBadge({ severity }) {
  const map = {
    crítico: 'bg-red-100 text-red-700 border-red-200',
    alto: 'bg-orange-100 text-orange-700 border-orange-200',
    medio: 'bg-amber-100 text-amber-700 border-amber-200',
    bajo: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${map[severity] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>{severity}</span>;
}

export default function ClarusUIPrototype() {
  const [sector, setSector] = useState('retail');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return pricingProducts.filter((item) =>
      item.producto.toLowerCase().includes(query.toLowerCase()) ||
      item.sku.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge className="rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-600">CLARUS</Badge>
              <Badge variant="outline" className="rounded-full">Smart Reporting Kit</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Inteligencia económica para decisiones empresariales</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
              Prototipo de interfaz para traducir IPC, TPM, dólar, costos y demanda en decisiones concretas de precio, margen y financiamiento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:flex md:flex-row">
            <Button className="rounded-2xl bg-slate-900 px-5">Actualizar escenario</Button>
            <Button variant="outline" className="rounded-2xl px-5">Exportar reporte</Button>
          </div>
        </motion.div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar SKU o producto..."
                  className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger className="w-[180px] rounded-2xl">
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="agro">Agro</SelectItem>
                    <SelectItem value="construccion">Construcción</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="rounded-2xl">
                  <Filter className="mr-2 h-4 w-4" /> Filtros
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  <Calendar className="mr-2 h-4 w-4" /> Junio 2026
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-blue-200 bg-blue-50 shadow-sm">
            <CardContent className="flex h-full items-center gap-4 p-5">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <Zap className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Decisión recomendada</p>
                <h3 className="text-lg font-semibold text-slate-900">Ajustar precios en SKUs importados y revisar compras financiadas</h3>
                <p className="mt-1 text-sm text-slate-700">Basado en presión de dólar + TPM alta + sensibilidad de margen.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {decisionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{card.title}</p>
                        <h3 className="mt-1 text-2xl font-semibold tracking-tight">{card.value}</h3>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <Icon className="h-5 w-5 text-slate-700" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{card.subtitle}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      <ArrowUpRight className="h-4 w-4" /> {card.delta}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Tabs defaultValue="resumen" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white p-1 shadow-sm md:w-fit">
            <TabsTrigger value="resumen" className="rounded-2xl">Resumen ejecutivo</TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-2xl">Pricing</TabsTrigger>
            <TabsTrigger value="alertas" className="rounded-2xl">Alertas IA</TabsTrigger>
            <TabsTrigger value="reportes" className="rounded-2xl">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl"><LineChart className="h-5 w-5" /> Tendencia macroeconómica</CardTitle>
                  <CardDescription>Seguimiento visual de IPC, TPM y dólar para lectura rápida del entorno.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                     <RLineChart data={macroSeries}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="mes" />
  <YAxis yAxisId="left" />
  <YAxis yAxisId="right" orientation="right" />
  <Tooltip />

  <Line
    yAxisId="left"
    type="monotone"
    dataKey="ipc"
    stroke="#2563eb"
    strokeWidth={2}
    dot={false}
  />

  <Line
    yAxisId="left"
    type="monotone"
    dataKey="tpm"
    stroke="#16a34a"
    strokeWidth={2}
    dot={false}
  />

  <Line
    yAxisId="right"
    type="monotone"
    dataKey="usd"
    stroke="#f59e0b"
    strokeWidth={2}
    dot={false}
  />
</RLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Impacto por línea</CardTitle>
                  <CardDescription>Categorías más expuestas al entorno económico actual.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="impacto" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Motor de recomendación de precios</CardTitle>
                <CardDescription>Ejemplo de tabla operativa para analizar precio actual, sugerido e impacto estimado.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-3 py-3 font-medium">SKU</th>
                        <th className="px-3 py-3 font-medium">Producto</th>
                        <th className="px-3 py-3 font-medium">Costo</th>
                        <th className="px-3 py-3 font-medium">Precio actual</th>
                        <th className="px-3 py-3 font-medium">Precio sugerido</th>
                        <th className="px-3 py-3 font-medium">Margen</th>
                        <th className="px-3 py-3 font-medium">Impacto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((item) => (
                        <tr key={item.sku} className="border-b border-slate-100 last:border-0">
                          <td className="px-3 py-4 font-medium">{item.sku}</td>
                          <td className="px-3 py-4">{item.producto}</td>
                          <td className="px-3 py-4">${item.costo.toLocaleString('es-CL')}</td>
                          <td className="px-3 py-4">${item.precioActual.toLocaleString('es-CL')}</td>
                          <td className="px-3 py-4 font-semibold text-slate-900">${item.precioSugerido.toLocaleString('es-CL')}</td>
                          <td className="px-3 py-4">{item.margen}</td>
                          <td className="px-3 py-4"><SeverityBadge severity={item.impacto.toLowerCase()} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full rounded-3xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-2xl bg-slate-100 p-3">
                          <Bell className="h-5 w-5 text-slate-700" />
                        </div>
                        <SeverityBadge severity={alert.severity} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{alert.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{alert.description}</p>
                      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                        <span className="font-medium">Acción sugerida:</span> {alert.action}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="rounded-3xl border-amber-200 bg-amber-50 shadow-sm">
              <CardContent className="flex items-start gap-3 p-5">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
                <div>
                  <h4 className="font-semibold text-slate-900">Lectura ejecutiva</h4>
                  <p className="mt-1 text-sm text-slate-700">
                    El sistema sugiere no subir precios de manera masiva. Recomienda segmentar por elasticidad, exposición al dólar y margen actual.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Reporte para gerencia</CardTitle>
                  <CardDescription>Resumen ejecutivo listo para exportar a PDF o presentación.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-700">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-medium text-slate-900">Titular del mes</p>
                    <p className="mt-1">Subir precios en productos importados y conservar precios en categorías de alta sensibilidad comercial.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-medium text-slate-900">Impacto esperado</p>
                    <p className="mt-1">Mejora de margen estimada entre 1,8 y 2,4 puntos, con menor deterioro de volumen.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-medium text-slate-900">Siguiente acción</p>
                    <p className="mt-1">Revisión semanal de TPM y dólar, más seguimiento comercial por categoría.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Módulos del producto</CardTitle>
                  <CardDescription>Estructura sugerida para el MVP de CLARUS.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      'Panel ejecutivo',
                      'Lectura macroeconómica',
                      'Motor de pricing',
                      'Alertas inteligentes',
                      'Escenarios y simulación',
                      'Exportación de reportes',
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

