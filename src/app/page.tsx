
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, Frown, ArrowRight, Star, Twitter, Instagram, Linkedin } from 'lucide-react';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import TerminalTextAnimation from '@/components/ui/terminal-text-animation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getReviews, type Review } from '@/app/actions';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';


const conversationExampleText = `"Eres estúpido, ¿Cómo pudiste hacer eso? ¡Eres un idiota!"
"Cálmate, fue un error..."
"¡Un error! Siempre arruinas todo. No sirves para nada."`;

function HeroSection1() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          {/* Left Column: Text and Button */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <AnimatedShinyText
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-purple-500 via-yellow-300 to-purple-500 bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent`
                  )}
                >
                    Alumbra:
                </AnimatedShinyText>
                 <br />
                 <span style={{color: '#e7d6f1'}}>
                   Ponle luz a tus palabras, claridad a tus vínculos
                 </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Con una simple acción de copiar y pegar la última conversación, Alumbra podría esbozar un escenario preocupante que indique una señal de advertencia hacia tu salud emocional.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/questionnaire" passHref>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,20%)] transition-all duration-300 ease-out hover:scale-105 active:scale-95 group"
                >
                  Comenzar Análisis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

           {/* Right Column: Card */}
           <div className="relative">
              <Card className="relative bg-card shadow-lg rounded-lg overflow-hidden ml-0 lg:ml-12 mt-12 lg:mt-0">
                <CardHeader className="bg-muted/30 p-4 flex flex-row items-center space-x-2">
                  <div className="flex space-x-1.5">
                     <span className="w-3 h-3 rounded-full bg-red-500"></span>
                     <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                     <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                   <p className="text-xs text-muted-foreground font-mono truncate">Análisis</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-md text-sm text-secondary-foreground">
                     <TerminalTextAnimation textToType={conversationExampleText} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Estado Emocional</h3>
                    <div className="flex items-center space-x-2">
                      <Frown className="w-5 h-5 text-destructive" />
                      <span className="text-foreground font-medium">Negativo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Alerta</h3>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="text-destructive font-medium">Abuso / Manipulación</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  avatarSrc: string | null;
  avatarFallback: string;
  name: string | null;
  role?: string;
  testimonial: string;
  imageHint?: string;
}

function TestimonialCard({ avatarSrc, avatarFallback, name, role, testimonial, imageHint }: TestimonialCardProps) {
  return (
    <Card className="bg-card shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center space-y-4">
        <Avatar className="w-20 h-20 mb-2">
          {avatarSrc ? (
             <AvatarImage src={avatarSrc} alt={name || 'Usuario'} data-ai-hint={imageHint || "person portrait"} />
          ) : null }
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-muted-foreground italic text-sm leading-relaxed">"{testimonial}"</p>
        <div>
          <p className="font-semibold text-foreground">{name || 'Usuario Anónimo'}</p>
          {role && <p className="text-xs text-muted-foreground">{role}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

const getInitials = (name: string | null | undefined): string => {
    if (!name) return 'A';
    const names = name.split(' ');
    if (names.length === 0 || names[0] === "") return 'A';
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
};


export default function WelcomePage() {
  const [year, setYear] = useState<number | string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());

    async function fetchReviews() {
      setIsLoadingReviews(true);
      setReviewsError(null);
      const result = await getReviews();
      if (result.reviews) {
        setReviews(result.reviews);
      } else if (result.error) {
        setReviewsError(result.error);
        console.error("Error fetching reviews:", result.error);
      }
      setIsLoadingReviews(false);
    }
    fetchReviews();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <HeroSection1 />

      <section className="w-full py-12 md:py-20 lg:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-10 sm:text-4xl md:text-5xl text-primary">
            Lo que dicen nuestros usuarios
          </h2>
          {isLoadingReviews && (
            <div className="flex justify-center items-center py-10">
              <Spinner size={48} />
              <p className="ml-4 text-muted-foreground">Cargando comentarios...</p>
            </div>
          )}
          {reviewsError && !isLoadingReviews && (
            <div className="text-center py-10 text-destructive">
              <p>Error al cargar comentarios: {reviewsError}</p>
            </div>
          )}
          {!isLoadingReviews && !reviewsError && reviews.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>Aún no hay comentarios. ¡Sé el primero!</p>
            </div>
          )}
          {!isLoadingReviews && !reviewsError && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((review) => (
                <TestimonialCard
                  key={review.id}
                  avatarSrc={review.userPhotoURL}
                  avatarFallback={getInitials(review.userName)}
                  name={review.userName}
                  testimonial={review.text}
                  imageHint={review.userPhotoURL ? "person" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

       {/* Footer Section */}
       <footer className="w-full bg-card text-card-foreground py-12">
          <div className="container px-4 md:px-6">
            {/* Multi-column layout from previous design - REMAINS UNCHANGED */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-primary mr-2">A</span>
                  <h3 className="text-xl font-semibold text-foreground">Alumbra</h3>
                </div>
                <p className="text-sm text-muted-foreground">Iluminando tus conversaciones y relaciones.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Producto</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Características</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Precios</Link></li>
                  <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Recursos</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Soporte</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Comunidad</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</Link></li>
                  <li><Link href="/security-policy" className="text-muted-foreground hover:text-primary transition-colors">Política de Seguridad</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</Link></li>
                </ul>
              </div>
            </div>

            <Separator className="bg-border my-8" />

            {/* Modified bottom section of the footer */}
            <div className="text-center text-sm text-muted-foreground">
              {year ? (
                <p className="mb-2">© {year} Alumbra. Todos los derechos reservados.</p>
              ) : (
                <p className="mb-2">© Alumbra. Todos los derechos reservados.</p>
              )}
              <div className="mb-2">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
                <span className="mx-2 text-muted-foreground/50">|</span>
                <Link href="/security-policy" className="hover:text-primary transition-colors">
                  Política de Seguridad
                </Link>
              </div>
              <p className="text-xs">Tu información es privada. El análisis se procesa de forma segura.</p>
            </div>
          </div>
       </footer>
    </main>
  );
}
