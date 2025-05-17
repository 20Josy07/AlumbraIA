
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SecurityPolicyPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Política de Seguridad de Alumbra AI</h1>
        <p className="text-sm text-muted-foreground mb-6">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-6 text-muted-foreground prose prose-invert lg:prose-xl">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Nuestro Compromiso con la Seguridad</h2>
            <p>En Alumbra AI, la seguridad de tus datos es una prioridad fundamental. Estamos comprometidos a implementar y mantener medidas de seguridad robustas para proteger la información que nos confías al utilizar nuestra Aplicación. Esta Política de Seguridad describe las prácticas que seguimos para salvaguardar tus datos.</p>
            <p className="border-l-4 border-destructive pl-4 italic text-sm">
              <strong>Importante:</strong> Esta es una política de seguridad de ejemplo. Las medidas de seguridad específicas pueden variar y deben adaptarse a las necesidades y tecnologías de tu aplicación. Este documento no constituye asesoramiento legal o de seguridad exhaustivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Medidas de Seguridad Implementadas</h2>
            <p>Hemos implementado una serie de medidas técnicas, administrativas y físicas diseñadas para proteger tu información contra el acceso, uso, alteración o divulgación no autorizados:</p>
            <ul>
              <li>
                <strong>Cifrado de Datos:</strong> Utilizamos cifrado para proteger los datos en tránsito (por ejemplo, mediante HTTPS) entre tu dispositivo y nuestros servidores. Consideramos el cifrado para datos en reposo cuando sea aplicable.
              </li>
              <li>
                <strong>Control de Acceso:</strong> El acceso a los datos personales está restringido al personal autorizado que necesita conocer dicha información para operar, desarrollar o mejorar nuestros servicios. Utilizamos Firebase Authentication para gestionar el acceso de los usuarios a sus cuentas.
              </li>
              <li>
                <strong>Prácticas de Desarrollo Seguro:</strong> Seguimos prácticas de desarrollo de software que incluyen la revisión de código y la consideración de la seguridad en el ciclo de vida del desarrollo.
              </li>
              <li>
                <strong>Seguridad de la Infraestructura:</strong> Nuestra infraestructura se basa en servicios de proveedores de nube reputados (como Google Cloud para Firebase y Genkit) que implementan sus propias medidas de seguridad robustas.
              </li>
              <li>
                <strong>Minimización de Datos:</strong> Nos esforzamos por recopilar solo la información necesaria para proporcionar y mejorar nuestros servicios. Las conversaciones enviadas para análisis se procesan con el objetivo de no almacenar permanentemente datos que identifiquen directamente a las personas involucradas en dichas conversaciones, a menos que sea esencial para la funcionalidad y con tu consentimiento.
              </li>
              <li>
                <strong>Gestión de Webhooks Seguros:</strong> Para funcionalidades como las alertas de emergencia, utilizamos webhooks para comunicarnos con servicios externos. Nos aseguramos de que estas comunicaciones se realicen de forma segura.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Tus Responsabilidades de Seguridad</h2>
            <p>La seguridad de tu cuenta también depende de ti. Te recomendamos:</p>
            <ul>
              <li>Utilizar una contraseña fuerte y única para tu cuenta de Google si utilizas Google Sign-In.</li>
              <li>No compartir tus credenciales de inicio de sesión con nadie.</li>
              <li>Cerrar sesión en tu cuenta cuando termines de usar la Aplicación, especialmente en dispositivos compartidos o públicos.</li>
              <li>Ser cauteloso con la información que compartes en las conversaciones que analizas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Notificación de Brecha de Seguridad</h2>
            <p>En el improbable caso de una brecha de seguridad que afecte tu información personal, tomaremos las medidas apropiadas para notificarte de acuerdo con las leyes y regulaciones aplicables. Esto puede incluir la notificación a través de la Aplicación o por correo electrónico (si lo has proporcionado).</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Servicios de Terceros</h2>
            <p>Utilizamos servicios de terceros para proporcionar ciertas funcionalidades, como Firebase para la autenticación y Genkit (que puede usar Google AI) para el análisis de conversaciones. Estos proveedores tienen sus propias políticas de seguridad y privacidad, y te recomendamos que las revises.</p>
            <ul>
              <li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidad de Firebase</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidad de Google</a></li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Limitación de Responsabilidad</h2>
            <p>Si bien tomamos medidas significativas para proteger tu información, ningún sistema de seguridad es completamente infalible. No podemos garantizar la seguridad absoluta de tu información. El uso de la Aplicación es bajo tu propio riesgo en lo que respecta a la seguridad de los datos que proporcionas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Cambios a Esta Política de Seguridad</h2>
            <p>Podemos actualizar esta Política de Seguridad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Seguridad en la Aplicación. Se te aconseja revisar esta Política de Seguridad periódicamente para cualquier cambio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Contáctanos</h2>
            <p>Si tienes preguntas o comentarios sobre esta Política de Seguridad, por favor contáctanos en: [Tu Dirección de Correo Electrónico de Contacto para Seguridad, ej. seguridad@alumbra.ai]</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPolicyPage;
