
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Divide, Group, RectangleHorizontal } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Divide className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-headline">
            Método de barras
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Un patio de recreo interactivo para visualizar divisiones, factores y restos de una forma divertida y atractiva.
        </p>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg">Instrucciones</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Cómo Usar el Método de Barras</DialogTitle>
                <DialogDescription>
                  Cada herramienta está diseñada para explorar un concepto matemático clave.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 text-left">
                <div className="flex items-start gap-4">
                  <Group className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Modo Agrupar: Entendiendo la División</h3>
                    <p className="text-sm text-muted-foreground">
                      Esta herramienta te ayuda a visualizar cómo funciona la división. El número total de bloques es el <span className="font-semibold text-primary">dividendo</span>. Cuando haces clic en un bloque, estableces el <span className="font-semibold text-primary">divisor</span>. La aplicación colorea los grupos para mostrar el <span className="font-semibold text-accent">cociente</span> y deja los bloques sobrantes como el <span className="font-semibold text-destructive">resto</span>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RectangleHorizontal className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Modo Rectángulo: Descubriendo Factores</h3>
                    <p className="text-sm text-muted-foreground">
                      Usa esta herramienta para explorar los <span className="font-semibold text-primary">factores</span> de un número. Al hacer clic en un bloque, intentas organizar el total de bloques en un rectángulo con ese número de columnas. Si puedes formar un rectángulo perfecto sin huecos, ¡has encontrado un factor!
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/tool">
            <Button size="lg">Ir</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
