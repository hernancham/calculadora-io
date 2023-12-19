import Image from "next/image";
import Link from "next/link";
import testImage from "@/public/image.jpg";

function page() {
  return (
    <section>
      <div className="container px-5 py-4 mx-auto">
        <div className="relative">
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-white">
              Toma de decisiones
            </span>
          </div>
        </div>
        <div className="space-y-8 lg:divide-y lg:divide-gray-100">
          <div className="pt-8 sm:flex lg:items-end group">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <Image
                className="w-full rounded-md h-32 lg:w-32 object-cover"
                src={testImage}
                alt="text"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">
                Toma de decisiones bajo certidumbre
              </span>
              <p className="mt-3 text-lg font-medium leading-6">
                <Link
                  href="/calculadora/teoria-de-decisiones/bajo-certidumbre"
                  className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl"
                >
                  Método: Proceso de Jerarquía Analítica
                </Link>
              </p>
              <p className="mt-2 text-lg text-gray-500">
                Método que ayuda a la toma de decisiones basado en fundamentos
                psicológicos, matemáticos y contrastes empíricos.
              </p>
            </div>
          </div>
          <div className="pt-8 sm:flex lg:items-end group">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <Image
                className="w-full rounded-md h-32 lg:w-32 object-cover"
                src={testImage}
                alt="text"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">
                Toma de decisiones bajo Riesgo
              </span>
              <p className="mt-3 text-lg font-medium leading-6">
                <Link
                  href="/calculadora/teoria-de-decisiones/de-riesgo"
                  className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl"
                >
                  Árbol de decisiones
                </Link>
              </p>
              <p className="mt-2 text-lg text-gray-500">
                La información con la que se cuenta para solucionar el problema
                es incompleta es decir se conoce el problema, las posibles
                soluciones pero no se conocen con certeza los resultados que
                pueden devolver.
              </p>
            </div>
          </div>
          <div className="pt-8 sm:flex lg:items-end group">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <Image
                className="w-full rounded-md h-32 lg:w-32 object-cover"
                src={testImage}
                alt="text"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">
                Toma de decisiones bajo Incertidumbre
              </span>
              <p className="mt-3 text-lg font-medium leading-6">
                <Link
                  href="/calculadora/teoria-de-decisiones/bajo-incertidumbre"
                  className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl"
                >
                  Matriz de pagos
                </Link>
              </p>
              <p className="mt-2 text-lg text-gray-500">
                En la toma de decisiones bajo incertidumbre, la distribución de
                probabilidad asociada con los estados de la naturaleza o se
                desconoce o no puede ser determinada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
