// src/app/politica-de-privacidad/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | L & X Multiservicios",
  description:
    "Política de privacidad de L & X Multiservicios. Conoce cómo protegemos y utilizamos tus datos personales.",
};

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Encabezado */}
        <header className="mb-10 border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
            L &amp; X Multiservicios
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Política de Privacidad
          </h1>
          <p className="text-sm md:text-base text-slate-300">
            Última actualización:{" "}
            <span className="font-semibold">2 de diciembre de 2025</span>
          </p>
        </header>

        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-200">
          <p>
            En <span className="font-semibold">L &amp; X Multiservicios</span>{" "}
            valoramos la confianza de nuestros clientes y nos comprometemos a
            proteger su información personal. La presente Política de Privacidad
            explica cómo recopilamos, usamos y protegemos los datos que
            obtenemos a través de nuestro sitio web y nuestros canales
            digitales.
          </p>

          {/* 1. Información que recopilamos */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              1. Información que recopilamos
            </h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>

            <div>
              <h3 className="font-semibold text-sky-300">
                a) Información personal proporcionada por el usuario
              </h3>
              <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                <li>Nombre y apellidos</li>
                <li>Número de teléfono</li>
                <li>Dirección de correo electrónico</li>
                <li>Dirección de envío</li>
                <li>
                  Otros datos necesarios para procesar pedidos o contactar al
                  cliente
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sky-300">
                b) Información recopilada de forma automática
              </h3>
              <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                <li>Dirección IP</li>
                <li>Tipo de dispositivo y navegador utilizado</li>
                <li>Páginas visitadas dentro del sitio</li>
                <li>
                  Cookies y tecnologías similares para mejorar la experiencia de
                  navegación
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sky-300">
                c) Información proveniente de servicios externos
              </h3>
              <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                <li>
                  Datos suministrados por WhatsApp Business al interactuar con
                  nuestro chatbot
                </li>
                <li>
                  Información proveniente de formularios de contacto o redes
                  sociales
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Uso de la información */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              2. Uso de la información
            </h2>
            <p>Utilizamos los datos recopilados para las siguientes finalidades:</p>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li>Procesar pedidos, pagos y entregas</li>
              <li>Contactar al cliente sobre sus compras o consultas</li>
              <li>Mejorar la experiencia del usuario en el sitio web</li>
              <li>
                Enviar promociones, catálogos o información relevante (cuando el
                usuario lo autoriza)
              </li>
              <li>
                Garantizar el correcto funcionamiento de nuestro chatbot y
                sistema de atención
              </li>
              <li>Cumplir con obligaciones legales y fiscales aplicables</li>
            </ul>
          </section>

          {/* 3. Protección de datos */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              3. Protección de datos
            </h2>
            <p>
              Nos comprometemos a proteger tu información utilizando medidas
              técnicas y organizativas razonables, tales como:
            </p>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li>Servidores seguros</li>
              <li>Uso de protocolo HTTPS en el sitio web</li>
              <li>Sistemas de seguridad y monitoreo</li>
              <li>Acceso limitado solo al personal autorizado</li>
            </ul>
            <p>
              No compartimos, vendemos ni cedemos tu información personal a
              terceros, salvo en los siguientes casos:
            </p>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li>
                Servicios de mensajería y paquetería, únicamente con los datos
                necesarios para la entrega
              </li>
              <li>
                Plataformas de pago seguras, para procesar transacciones
                autorizadas por el usuario
              </li>
              <li>
                Requerimientos legales o solicitudes de autoridades competentes
              </li>
            </ul>
          </section>

          {/* 4. Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              4. Uso de cookies
            </h2>
            <p>
              Nuestro sitio utiliza cookies y tecnologías similares para
              mejorar la experiencia de navegación. Estas pueden usarse para:
            </p>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li>Recordar preferencias del usuario</li>
              <li>Analizar el tráfico del sitio</li>
              <li>Mejorar la rapidez y el rendimiento del sitio web</li>
            </ul>
            <p>
              El usuario puede desactivar las cookies desde la configuración de
              su navegador; sin embargo, algunas funciones del sitio podrían no
              funcionar correctamente.
            </p>
          </section>

          {/* 5. Enlaces externos */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              5. Enlaces externos
            </h2>
            <p>
              Nuestro sitio web puede contener enlaces a páginas o servicios de
              terceros, como WhatsApp, Facebook o TikTok.{" "}
              <span className="font-semibold">
                L &amp; X Multiservicios no se responsabiliza
              </span>{" "}
              por las políticas de privacidad ni por el contenido de dichos
              sitios. Te recomendamos revisar las políticas de privacidad de
              cada servicio externo que utilices.
            </p>
          </section>

          {/* 6. Derechos del usuario */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              6. Derechos del usuario
            </h2>
            <p>
              Como usuario, tienes derecho a solicitar en cualquier momento:
            </p>
            <ul className="list-disc list-inside ml-3 space-y-1">
              <li>Acceso a la información personal que almacenamos sobre ti</li>
              <li>Corrección o actualización de tus datos</li>
              <li>
                Eliminación de tus datos personales, cuando legalmente sea
                posible
              </li>
              <li>Revocación de tu consentimiento para el envío de información</li>
            </ul>
            <p>Para ejercer estos derechos, puedes contactarnos en:</p>
            <div className="ml-3 space-y-1">
              <p>
                📩{" "}
                <span className="font-mono">
                  lxmultiservicios.ec@gmail.com
                </span>
              </p>
              <p>
                📞 <span className="font-mono">+593 98 738 4110</span>
              </p>
            </div>
          </section>

          {/* 7. Cambios */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              7. Cambios en esta Política de Privacidad
            </h2>
            <p>
              L &amp; X Multiservicios se reserva el derecho de actualizar o
              modificar esta Política de Privacidad en cualquier momento.
              Cualquier cambio será publicado en esta misma página, indicando la
              fecha de la última actualización.
            </p>
          </section>

          {/* 8. Aceptación */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-sky-400">
              8. Aceptación de esta política
            </h2>
            <p>
              Al navegar en nuestro sitio web, utilizar nuestros servicios
              online o comunicarse con nosotros a través de nuestros canales
              digitales, el usuario reconoce que ha leído y acepta los términos
              de esta Política de Privacidad.
            </p>
          </section>

          <div className="pt-6">
            <a
              href="/"
              className="inline-flex items-center rounded-lg border border-sky-500 px-4 py-2 text-sm font-medium text-sky-200 hover:bg-sky-500/10 transition"
            >
              ← Volver al inicio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
