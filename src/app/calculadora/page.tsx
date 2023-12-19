import Image from "next/image";
import Link from "next/link";
import testImage from "@/public/720x400.png";
import desiciones from "@/public/principal/decisiones.jpg";
import inventarios from "@/public/principal/inventarios.jpg";
import redes from "@/public/principal/redes.jpg";
import colas from "@/public/principal/colas.jpg";

export default function CalculadoraPage() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Calculadora Investigacion Operativa
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Herramienta en línea para resolver problemas y optimizar
              decisiones con métodos de Investigación Operativa, como
              programación lineal, optimizacion, transporte, y asignación de
              tareas.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <Link href="/calculadora/modelo-de-redes">
              <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-500/25">
                <Image
                  className="h-40 rounded w-full object-cover object-top mb-6"
                  src={redes}
                  alt="content"
                  width={720}
                  height={400}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  MODELO DE REDES
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Ruta Critica PERT-CPM
                </h2>
                <p className="leading-relaxed text-base">
                  Es una técnica de gestión de proyectos que se utiliza para
                  planificar, programar y controlar las actividades.
                </p>
              </div>
            </Link>
            <Link href="/calculadora/modelo-de-inventarios">
              <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-500/25">
                <Image
                  className="h-40 rounded w-full object-cover object-top mb-6"
                  src={inventarios}
                  alt="content"
                  width={720}
                  height={400}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  MODELO DE INVENTARIOS
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Modelo EOQ - Variaciones
                </h2>
                <p className="leading-relaxed text-base">
                  Es utilizada en gestión de inventarios para determinar la
                  cantidad óptima de productos que una empresa debe ordenar o
                  producir en cada ciclo de reposición.
                </p>
              </div>
            </Link>
            <Link href="/calculadora/teoria-de-decisiones">
              <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-500/25">
                <Image
                  className="h-40 rounded w-full object-cover object-top mb-6"
                  src={desiciones}
                  alt="content"
                  width={720}
                  height={400}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  TEORÍA DE DECISIONES
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Certidumbre - Riesgo - Incertidumbre
                </h2>
                <p className="leading-relaxed text-base">
                  Estudia cómo las personas toman decisiones en situaciones
                  inciertas, considerando objetivos y preferencias para
                  seleccionar la mejor opción disponible.
                </p>
              </div>
            </Link>
            <Link href="/calculadora/teoria-de-colas">
              <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-500/25">
                <Image
                  className="h-40 rounded w-full object-cover object-top mb-6"
                  src={colas}
                  alt="content"
                  width={720}
                  height={400}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  TEORÍA DE COLAS
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  En Desarrollo ...
                </h2>
                <p className="leading-relaxed text-base">
                  En espera de contenido ...
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
