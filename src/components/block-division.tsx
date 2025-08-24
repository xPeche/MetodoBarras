
"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Divide, RotateCw, Group, X, MousePointerClick, RectangleHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


type BlockState = {
  color: string;
  isRemainder: boolean;
  animationState?: 'added' | 'removed';
};

export function BlockDivision() {
  const [totalBlocks, setTotalBlocks] = useState(1)
  const [inputValue, setInputValue] = useState(totalBlocks.toString());
  const [activeGroupSize, setActiveGroupSize] = useState<number | null>(null)
  const [blocks, setBlocks] = useState<BlockState[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)
  const [isGroupingMode, setIsGroupingMode] = useState(false)
  const [isLayoutMode, setIsLayoutMode] = useState(false)
  const [numColumns, setNumColumns] = useState<number | null>(null)
  const lastBlockRef = useRef<HTMLDivElement>(null);


  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const oldTotal = blocks.length;
    
    if (totalBlocks === oldTotal) {
      return;
    }

    setIsAnimating(true);
    
    const newBlocks = Array.from({ length: totalBlocks }, (_, i) => {
        return blocks[i] || {
            color: 'hsl(var(--primary))',
            isRemainder: false,
            animationState: 'added' as const
        };
    });

    if (totalBlocks < oldTotal) {
        setBlocks(prevBlocks => {
            const updatedBlocks = [...prevBlocks];
            for (let i = totalBlocks; i < oldTotal; i++) {
                if (updatedBlocks[i]) {
                    updatedBlocks[i].animationState = 'removed';
                }
            }
            return updatedBlocks;
        });
        
        setTimeout(() => {
            setBlocks(newBlocks.slice(0, totalBlocks));
        }, 300);
    } else {
        setBlocks(newBlocks);
    }
    
    setTimeout(() => {
        setIsAnimating(false);
        setBlocks(currentBlocks => currentBlocks.map(b => ({ ...b, animationState: undefined })));
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalBlocks]);


  const blockColors = useMemo(() => [
    '#60A5FA', '#4ADE80', '#FACC15', '#F472B6',
    '#A78BFA', '#818CF8', '#F87171', '#2DD4BF'
  ], []);

  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInputValue(totalBlocks.toString());
  }, [totalBlocks]);

  const handleTotalBlocksChange = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value >= 1 && value !== totalBlocks) {
      handleReset();
      setTotalBlocks(value);
    } else {
      setInputValue(totalBlocks.toString());
    }
  };
  
  const handleBlockClick = (index: number) => {
    if (isAnimating) return;
    
    if (isGroupingMode) {
        const newGroupSize = index + 1;
        if (newGroupSize < 1) return;
        
        setHoveredGroup(null);
        animateGroups(newGroupSize);
    } else if (isLayoutMode) {
        const newNumColumns = index + 1;
        setNumColumns(newNumColumns);
        resetBlockColors();
        setActiveGroupSize(null);
    }
  };
  
  const animateGroups = (currentGroupSize: number) => {
    setActiveGroupSize(currentGroupSize);
    setIsAnimating(true);
    let delay = 0;
    
    const maxAnimationTime = 1000;
    const animationSpeed = Math.max(50, maxAnimationTime / totalBlocks);

    const numGroups = Math.floor(totalBlocks / currentGroupSize);

    for (let i = 0; i < totalBlocks; i++) {
        setTimeout(() => {
            setBlocks(prevBlocks => {
                const newBlocks = [...prevBlocks];
                 if (newBlocks.length !== totalBlocks) {
                    newBlocks.length = totalBlocks;
                    for(let j=0; j<totalBlocks; j++) {
                        if(!newBlocks[j]) {
                            newBlocks[j] = { color: 'hsl(var(--primary))', isRemainder: false };
                        }
                    }
                }
                const groupIndex = Math.floor(i / currentGroupSize);
                
                if (groupIndex < numGroups) {
                    newBlocks[i] = { ...newBlocks[i], color: blockColors[groupIndex % blockColors.length], isRemainder: false };
                } else {
                    newBlocks[i] = { ...newBlocks[i], color: 'hsl(var(--destructive))', isRemainder: true };
                }
                return newBlocks;
            });

            if (i === totalBlocks - 1) {
                setTimeout(() => {
                    setIsAnimating(false);
                }, 200);
            }

        }, delay);
        delay += animationSpeed;
    }
  }

  const handleReset = () => {
    setActiveGroupSize(null)
    setIsAnimating(false)
    setHoveredGroup(null)
    setNumColumns(null);
    setIsGroupingMode(false);
    setIsLayoutMode(false);
    setBlocks(Array.from({ length: totalBlocks }, () => ({ color: 'hsl(var(--primary))', isRemainder: false })));
  }

  const resetBlockColors = () => {
     setBlocks(Array.from({ length: totalBlocks }, () => ({ color: 'hsl(var(--primary))', isRemainder: false })));
     setActiveGroupSize(null);
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <Card className="w-full bg-card shadow-lg border-2 flex-grow flex flex-col transition-all border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Divide className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold font-headline">División Interactiva</CardTitle>
                  <CardDescription>Explora divisores y factores agrupando y organizando bloques.</CardDescription>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 flex-grow min-h-0">
          <div className="flex items-center gap-2">
            <label htmlFor="total-blocks-input" className="font-medium whitespace-nowrap">Bloques Totales:</label>
            <Input
                id="total-blocks-input"
                type="number"
                min={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleTotalBlocksChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleTotalBlocksChange();
                        (e.target as HTMLInputElement).blur();
                    }
                }}
                disabled={isAnimating}
                className="w-28"
            />
          </div>

          <div 
            className="bg-background rounded-lg border-2 border-dashed p-4 transition-colors duration-300 flex-grow min-h-0 relative mt-8 flex flex-col"
          >
            <ScrollArea className="w-full h-full flex-grow min-h-0">
              <div className="h-full w-full" ref={parentRef}>
                <div
                  id="block-container"
                  className={cn("relative grid gap-2 w-full h-full")}
                  style={{
                    gridTemplateColumns: numColumns ? `repeat(${numColumns}, minmax(40px, 1fr))` : 'repeat(auto-fit, minmax(40px, 1fr))',
                  }}
                   onMouseLeave={() => (isGroupingMode && !isAnimating) && setHoveredGroup(null)}
                >
                  {blocks.map((block, i) => (
                    <div
                      id={`block-${i}`}
                      key={i}
                      ref={i === totalBlocks -1 ? lastBlockRef : null}
                      data-animation-state={block.animationState}
                      onClick={() => handleBlockClick(i)}
                      onMouseEnter={() => (isGroupingMode && !isAnimating) && setHoveredGroup(i)}
                      className={cn(
                        "rounded-md transition-all duration-200 flex items-center justify-center font-semibold w-full min-h-10 relative",
                        "data-[animation-state=added]:animate-split-in data-[animation-state=removed]:animate-split-out",
                        block.isRemainder ? 'bg-transparent border-2 border-destructive text-foreground' : 'text-primary-foreground',
                        ((isGroupingMode || isLayoutMode) && !isAnimating) && "cursor-pointer hover:scale-110",
                        (isGroupingMode && hoveredGroup !== null && i <= hoveredGroup) && 'ring-2 ring-accent'
                      )}
                      style={{
                        backgroundColor: block.isRemainder ? undefined : block.color,
                        transformOrigin: 'center',
                        fontSize: `clamp(0.5rem, ${4 / (String(totalBlocks).length)}rem, 1.25rem)`
                      }}
                    >
                       <span >
                        {i + 1}
                      </span>
                      {(isGroupingMode && hoveredGroup === i && !isAnimating && hoveredGroup !== null) && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-accent text-accent-foreground font-bold text-sm z-10">
                          {hoveredGroup + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-fit p-4 flex items-center justify-center gap-4">
        {(isGroupingMode || isLayoutMode) && !isAnimating && (
            <div className="text-center font-bold text-accent rounded-xl px-4 py-2 animate-in fade-in flex items-center gap-2 justify-center pointer-events-none whitespace-nowrap bg-card/80 backdrop-blur-sm border-2">
              <MousePointerClick className="h-5 w-5" />
              <span>
                {isGroupingMode && "Haz clic en un bloque para fijar el tamaño del grupo."}
                {isLayoutMode && "Haz clic en un bloque para formar un rectángulo."}
              </span>
            </div>
        )}
        <div className="bg-card/80 backdrop-blur-sm border-2 rounded-xl shadow-2xl p-2 flex justify-center gap-2">
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button 
                    variant={isGroupingMode ? "destructive" : "default"}
                    onClick={() => {
                        const newMode = !isGroupingMode;
                        setIsGroupingMode(newMode);
                        if (newMode) {
                            setIsLayoutMode(false);
                            resetBlockColors();
                        } else {
                            resetBlockColors();
                        }
                    }} 
                    disabled={isAnimating}
                  >
                   {isGroupingMode ? <X /> : <Group />}
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isGroupingMode ? "Cancelar Agrupación" : "Activar Modo Agrupar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button 
                    variant={isLayoutMode ? "destructive" : "default"}
                    onClick={() => {
                        const newMode = !isLayoutMode;
                        setIsLayoutMode(newMode);
                        if (newMode) {
                            setIsGroupingMode(false);
                            resetBlockColors();
                        } else {
                           //
                        }
                    }} 
                    disabled={isAnimating}
                  >
                   {isLayoutMode ? <X /> : <RectangleHorizontal />}
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLayoutMode ? "Cancelar" : "Activar Modo Rectángulo"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleReset} variant="outline" disabled={isAnimating}>
                  <RotateCw />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reiniciar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
