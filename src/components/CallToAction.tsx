import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  titulo?: string;
  descripcion?: string;
  botonPrimario?: {
    texto: string;
    href: string;
  };
  botonSecundario?: {
    texto: string;
    href: string;
  };
}

export default function CallToAction({
  titulo = "¡Aquí la Aventura no se Cuenta... se Vive!",
  descripcion = "No esperes más, contáctanos ahora y comienza a planear tu experiencia única en el Chocó",
  botonPrimario = { texto: "RESERVAR AHORA", href: "/reservas" },
  botonSecundario = { texto: "MÁS INFORMACIÓN", href: "/contacto" }
}: CallToActionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-[#E53935] to-[#FB8C00] san-pacho-effect">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">{titulo}</h2>
        <p className="text-xl mb-8">{descripcion}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={botonPrimario.href}>
            <Button size="lg" className="bg-white text-[#E53935] hover:bg-gray-100 font-bold px-8 py-4 magnetic-button wave-button">
              {botonPrimario.texto}
            </Button>
          </Link>
          <Link href={botonSecundario.href}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-4 glass-effect">
              {botonSecundario.texto}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}