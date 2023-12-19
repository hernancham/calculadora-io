import Image from "next/image";
import Link from "next/link";
import testImage from "@/public/image.jpg";

const valores = [
  {
    link: "/calculadora/modelo-de-inventarios/clasico",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo Clasico",
    cont: "",
  },
  {
    link: "/calculadora/modelo-de-inventarios/faltantes-planeados",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo con Faltantes Planeados",
    cont: "",
  },
  {
    link: "/calculadora/modelo-de-inventarios/mrp",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo MRP",
    cont: "",
  },
  {
    link: "/calculadora/modelo-de-inventarios/unico",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo Unico de Inventario",
    cont: "",
  },
  {
    link: "/calculadora/modelo-de-inventarios/demanda-probable",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo de Demanda Probable",
    cont: "",
  },
  {
    link: "/calculadora/modelo-de-inventarios/revision-periodica",
    img: testImage,
    alt: "text",
    sub: "",
    tit: "Modelo REvision Periodica Diaria",
    cont: "",
  },
];

const ItemContenido = ({
  link,
  img,
  alts,
  sub,
  tit,
  cont,
}: {
  link: string;
  img: any;
  alts: string;
  sub: string;
  tit: string;
  cont: string;
}) => {
  return (
    <div className="pt-8 sm:flex lg:items-end group">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
        <Image
          className="w-full rounded-md h-32 lg:w-32 object-cover"
          src={img}
          alt={alts}
        />
      </div>
      <div>
        <span className="text-sm text-gray-500">{sub}</span>
        <p className="mt-3 text-lg font-medium leading-6">
          <Link
            href={link}
            className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl"
          >
            {tit}
          </Link>
        </p>
        <p className="mt-2 text-lg text-gray-500">{cont}</p>
      </div>
    </div>
  );
};

function page() {
  return (
    <section>
      <div className="container px-5 py-4 mx-auto">
        <div className="relative">
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-white">
              Modelos de Inventarios
            </span>
          </div>
        </div>
        <div className="space-y-8 lg:divide-y lg:divide-gray-100">
          {valores.map((valor: any, index: number) => (
            <ItemContenido
              link={valor.link}
              img={valor.img}
              alts={valor.alt}
              sub={valor.sub}
              tit={valor.tit}
              cont={valor.cont}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default page;
