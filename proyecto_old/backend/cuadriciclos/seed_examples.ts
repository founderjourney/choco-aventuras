import { api } from "encore.dev/api";
import db from "../db";
import type { Cuadriciclo } from "./list";

export interface SeedExamplesResponse {
  message: string;
  cuadriciclos: Cuadriciclo[];
}

export const seedExamples = api<void, SeedExamplesResponse>(
  { expose: true, method: "POST", path: "/cuadriciclos/seed-examples" },
  async () => {
    const examples = [
      {
        nombre: "Grizzly Edition Special",
        marca: "Yamaha",
        modelo: "Grizzly 700 Edition Special",
        año: 2024,
        color: "Rojo",
        precio_hora: 65.00,
        precio_dia: 480.00,
        descripcion: "Cuadriciclo premium de alta gama, perfecto para tours de selva, aventuras extremas y experiencias culturales. Equipado con tecnología avanzada y máxima seguridad.",
        fotos: ["/images/grizzly-red.jpg", "/images/grizzly-red-2.jpg", "/images/grizzly-red-action.jpg"],
        caracteristicas: [
          "Motor 708cc EPS (Electronic Power Steering)",
          "Tracción 4x4 con diferencial bloqueante",
          "Suspensión independiente ajustable",
          "Frenos de disco hidráulicos",
          "Protección completa de chasis",
          "Luces LED de alta intensidad",
          "Winch eléctrico incluido",
          "GPS de navegación integrado",
          "Kit de primeros auxilios incluido",
          "Casco y equipo de protección incluido",
          "Ideal para tours de selva y aventuras culturales",
          "Certificado para paintball y actividades extremas"
        ]
      },
      {
        nombre: "Jungle Explorer",
        marca: "Honda",
        modelo: "FourTrax Foreman Rubicon",
        año: 2023,
        color: "Verde selva",
        precio_hora: 55.00,
        precio_dia: 420.00,
        descripcion: "Diseñado específicamente para tours de selva y exploración de senderos naturales. Perfecto para avistamiento de vida silvestre y tours culturales.",
        fotos: ["/images/honda-jungle.jpg", "/images/honda-jungle-2.jpg"],
        caracteristicas: [
          "Motor 518cc de alta eficiencia",
          "Transmisión automática ESP",
          "Tracción 4x4 con bloqueo de diferencial",
          "Suspensión de largo recorrido",
          "Protección anti-lodo integral",
          "Sistema de navegación para senderos",
          "Compartimento impermeable",
          "Luces antiniebla",
          "Silenciador ultra-silencioso para vida silvestre",
          "Equipo de seguridad completo incluido",
          "Certificado para tours ecológicos",
          "Guía cultural incluida en tours"
        ]
      },
      {
        nombre: "Paintball Warrior",
        marca: "Can-Am",
        modelo: "Outlander 570 DPS",
        año: 2023,
        color: "Negro táctico",
        precio_hora: 50.00,
        precio_dia: 380.00,
        descripcion: "Cuadriciclo especializado para actividades de paintball y combate táctico. Equipado con protecciones especiales y accesorios para juegos de estrategia.",
        fotos: ["/images/canam-tactical.jpg", "/images/canam-tactical-2.jpg"],
        caracteristicas: [
          "Motor 570cc Rotax de alto rendimiento",
          "Transmisión CVT con modo deportivo",
          "Protección balística en puntos clave",
          "Suspensión reforzada para terreno irregular",
          "Soporte para equipo táctico",
          "Camuflaje opcional disponible",
          "Sistema de comunicación integrado",
          "Protección extra para paintball",
          "Neumáticos de tracción extrema",
          "Kit de seguridad militar incluido",
          "Certificado para actividades de combate",
          "Instructor de paintball incluido"
        ]
      },
      {
        nombre: "Cultural Adventure",
        marca: "Polaris",
        modelo: "Sportsman 850 Premium",
        año: 2024,
        color: "Azul cultural",
        precio_hora: 48.00,
        precio_dia: 360.00,
        descripcion: "Ideal para tours culturales y visitas a sitios históricos. Diseñado para comfort en largos recorridos y acceso a comunidades locales.",
        fotos: ["/images/polaris-cultural.jpg", "/images/polaris-cultural-2.jpg"],
        caracteristicas: [
          "Motor 850cc ProStar de bajo ruido",
          "Suspensión comfort para largos recorridos",
          "Asientos ergonómicos premium",
          "Compartimento para cámara y equipo",
          "Sistema de audio para guía cultural",
          "Protección UV completa",
          "Neumáticos de baja huella ecológica",
          "Kit de hidratación incluido",
          "Mapa cultural digital",
          "Guía bilingüe incluida",
          "Certificado para acceso a reservas",
          "Seguro cultural incluido"
        ]
      },
      {
        nombre: "Family Safari",
        marca: "Yamaha",
        modelo: "Kodiak 450 EPS",
        año: 2023,
        color: "Beige safari",
        precio_hora: 40.00,
        precio_dia: 300.00,
        descripcion: "Cuadriciclo familiar perfecto para safaris y aventuras suaves. Ideal para familias con niños y principiantes en actividades de naturaleza.",
        fotos: ["/images/yamaha-safari.jpg", "/images/yamaha-safari-2.jpg"],
        caracteristicas: [
          "Motor 421cc ultraconfiable",
          "Dirección asistida EPS",
          "Modo familiar de seguridad",
          "Asiento doble disponible",
          "Protección solar integrada",
          "Velocidad limitada para seguridad",
          "Sistema de localización GPS",
          "Kit de emergencia familiar",
          "Prismáticos incluidos",
          "Casco para niños disponible",
          "Certificado para menores de edad",
          "Instructor familiar incluido"
        ]
      },
      {
        nombre: "Extreme Adventure",
        marca: "Arctic Cat",
        modelo: "Alterra 700 XT",
        año: 2024,
        color: "Naranja extremo",
        precio_hora: 60.00,
        precio_dia: 450.00,
        descripcion: "Para aventureros extremos que buscan la máxima adrenalina. Perfecto para terrenos difíciles, cruces de ríos y desafíos técnicos.",
        fotos: ["/images/arctic-extreme.jpg", "/images/arctic-extreme-2.jpg"],
        caracteristicas: [
          "Motor 695cc de alta potencia",
          "Suspensión FOX de competición",
          "Protección integral de aluminio",
          "Neumáticos de tracción extrema",
          "Winch de 3500 lbs incluido",
          "Sistema de comunicación de emergencia",
          "Protección impermeable IP67",
          "Kit de supervivencia incluido",
          "Luces de exploración de alta potencia",
          "Equipo de seguridad extrema",
          "Certificado para terrenos clase 5",
          "Instructor de aventura extrema"
        ]
      }
    ];

    const cuadriciclos: Cuadriciclo[] = [];

    for (const example of examples) {
      const row = await db.queryRow<Cuadriciclo>`
        INSERT INTO cuadriciclos (
          nombre, marca, modelo, año, color, precio_hora, precio_dia, 
          descripcion, fotos, caracteristicas, updated_at
        ) VALUES (
          ${example.nombre}, ${example.marca}, ${example.modelo}, ${example.año}, 
          ${example.color}, ${example.precio_hora}, ${example.precio_dia}, 
          ${example.descripcion}, ${example.fotos}, ${example.caracteristicas}, NOW()
        )
        RETURNING 
          id,
          nombre,
          marca,
          modelo,
          año,
          color,
          precio_hora::float as precio_hora,
          precio_dia::float as precio_dia,
          descripcion,
          fotos,
          estado,
          caracteristicas,
          created_at,
          updated_at
      `;
      cuadriciclos.push(row!);
    }

    return {
      message: "6 cuadriciclos especializados creados exitosamente - Yamaha Grizzly 700 Edition Special y más modelos para tours de selva, paintball, experiencias culturales y aventuras familiares",
      cuadriciclos
    };
  }
);