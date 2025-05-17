
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage: NextPage = () => {
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

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Política de Privacidad de Alumbra AI</h1>
        <p className="text-sm text-muted-foreground mb-6">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-6 text-muted-foreground prose prose-invert lg:prose-xl">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introducción</h2>
            <p>Bienvenido/a a Alumbra AI ("nosotros", "nuestro"). Nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando utilizas nuestra aplicación Alumbra AI (la "Aplicación"). Por favor, lee esta política de privacidad cuidadosamente. Si no estás de acuerdo con los términos de esta política de privacidad, por favor no accedas a la Aplicación.</p>
            <p className="border-l-4 border-destructive pl-4 italic text-sm">
              <strong>Importante:</strong> Esta es una política de privacidad de ejemplo y no constituye asesoramiento legal. Debes consultar con un profesional legal para asegurar el cumplimiento con todas las leyes y regulaciones aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Información que Recopilamos</h2>
            <p>Podemos recopilar información sobre ti de varias maneras. La información que podemos recopilar a través de la Aplicación incluye:</p>
            <ul>
              <li>
                <strong>Datos Personales:</strong> Información de identificación personal, como tu nombre, apellido, edad, género y dirección de correo electrónico (incluyendo correo de contacto de emergencia si lo proporcionas), que nos das voluntariamente al registrarte en la Aplicación o al completar el cuestionario inicial y los detalles de usuario.
              </li>
              <li>
                <strong>Datos del Cuestionario:</strong> Respuestas que proporcionas al cuestionario inicial sobre el tipo de relación y tus sentimientos acerca de la persona o personas involucradas en las conversaciones que analizas.
              </li>
              <li>
                <strong>Datos de Conversación:</strong> El texto de las conversaciones que ingresas para análisis. Nos esforzamos por procesar esta información de manera que se minimice la retención de datos personales identificables de las conversaciones después del análisis. Las conversaciones no se almacenan de forma permanente asociada a tu identidad sin tu consentimiento explícito.
              </li>
              <li>
                <strong>Datos de Retroalimentación:</strong> Comentarios y sugerencias que nos envías a través de la función de retroalimentación. Si has iniciado sesión, tu ID de usuario podría asociarse con esta retroalimentación.
              </li>
              <li>
                <strong>Datos de Uso Derivados:</strong> Información que nuestros servidores recopilan automáticamente cuando accedes a la Aplicación, como tu dirección IP, tipo de navegador, sistema operativo, tiempos de acceso y las páginas que has visto directamente antes y después de acceder a la Aplicación.
              </li>
              <li>
                <strong>Datos de Dispositivos Móviles:</strong> Información del dispositivo, como el ID de tu dispositivo móvil, modelo y fabricante, y la información de ubicación, si accedes a la Aplicación desde un dispositivo móvil.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Cómo Usamos Tu Información</h2>
            <p>Tener información precisa sobre ti nos permite proporcionarte una experiencia fluida, eficiente y personalizada. Específicamente, podemos usar la información recopilada sobre ti a través de la Aplicación para:</p>
            <ul>
              <li>Crear y gestionar tu cuenta.</li>
              <li>Procesar y analizar las conversaciones que envías para identificar posibles signos de abuso emocional o manipulación.</li>
              <li>Proporcionarte resultados de análisis personalizados, incluyendo puntuaciones de riesgo, categorías detectadas, ejemplos y recomendaciones.</li>
              <li>Personalizar tu experiencia y ofrecerte contenido relevante.</li>
              <li>Permitir la funcionalidad de alerta de emergencia (si la configuras), transmitiendo información necesaria a tu contacto de emergencia a través de un servicio de webhook. No almacenamos la dirección de correo electrónico de tu contacto de emergencia de forma persistente.</li>
              <li>Recopilar comentarios para mejorar la Aplicación.</li>
              <li>Monitorear y analizar el uso y las tendencias para mejorar tu experiencia con la Aplicación.</li>
              <li>Notificarte sobre actualizaciones de la Aplicación.</li>
              <li>Responder a solicitudes de servicio al cliente y soporte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Divulgación de Tu Información</h2>
            <p>Podemos compartir información que hemos recopilado sobre ti en ciertas situaciones. Tu información puede ser divulgada de la siguiente manera:</p>
            <ul>
              <li>
                <strong>Por Ley o para Proteger Derechos:</strong> Si creemos que la divulgación de información sobre ti es necesaria para responder a un proceso legal, para investigar o remediar posibles violaciones de nuestras políticas, o para proteger los derechos, propiedad y seguridad de otros, podemos compartir tu información según lo permitido o requerido por cualquier ley, regla o regulación aplicable.
              </li>
              <li>
                <strong>Proveedores de Servicios de Terceros:</strong> Podemos compartir tu información con terceros que realizan servicios para nosotros o en nuestro nombre, incluyendo análisis de datos (como Google AI a través de Genkit para el análisis de conversaciones), servicios de autenticación (Firebase Authentication), y servicios de envío de correo electrónico a través de webhooks (para alertas de emergencia).
              </li>
              <li>
                <strong>Transferencias Comerciales:</strong> Podemos compartir o transferir tu información en conexión con, o durante las negociaciones de, cualquier fusión, venta de activos de la compañía, financiación o adquisición de todo o una porción de nuestro negocio a otra compañía.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Cookies y Tecnologías de Seguimiento</h2>
            <p>Podemos usar cookies, balizas web, píxeles de seguimiento y otras tecnologías de seguimiento en la Aplicación para ayudar a personalizar la Aplicación y mejorar tu experiencia. Cuando accedes a la Aplicación, tu información personal no se recopila mediante el uso de tecnología de seguimiento. La mayoría de los navegadores están configurados para aceptar cookies por defecto. Puedes eliminar o rechazar las cookies, pero ten en cuenta que tal acción podría afectar la disponibilidad y funcionalidad de la Aplicación.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Seguridad de Tu Información</h2>
            <p>Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger tu información personal. Si bien hemos tomado medidas razonables para asegurar la información personal que nos proporcionas, ten en cuenta que a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable, y ningún método de transmisión de datos puede garantizarse contra cualquier interceptación u otro tipo de mal uso.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Política para Niños</h2>
            <p>No solicitamos conscientemente información ni comercializamos a niños menores de 13 años (o la edad aplicable según la jurisdicción). Si te das cuenta de que hemos recopilado información de un niño menor de 13 años, por favor contáctanos utilizando la información de contacto proporcionada a continuación.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Tus Derechos de Privacidad</h2>
            <p>Dependiendo de tu jurisdicción, puedes tener ciertos derechos con respecto a tu información personal, tales como el derecho a acceder, corregir o eliminar tus datos personales. Para ejercer estos derechos, por favor contáctanos.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Cambios a Esta Política de Privacidad</h2>
            <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en la Aplicación. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">10. Contáctanos</h2>
            <p>Si tienes preguntas o comentarios sobre esta Política de Privacidad, por favor contáctanos en: [Tu Dirección de Correo Electrónico de Contacto para Privacidad, ej. privacidad@alumbra.ai]</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
