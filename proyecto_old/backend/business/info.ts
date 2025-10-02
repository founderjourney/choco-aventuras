import { api } from "encore.dev/api";

export interface BusinessInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  schedule: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  policies: {
    minimumAge: number;
    requiredDocuments: string[];
    deposit: string;
    clothingRequirements: string[];
    safetyRequirements: string[];
    responsibilityPolicy: string;
  };
  colors: {
    primary: {
      darkGreen: string;
      atratoBlue: string;
      gold: string;
    };
    secondary: {
      adrenalineRed: string;
      vibrantOrange: string;
    };
    neutral: {
      deepBlack: string;
      lightGray: string;
      pureWhite: string;
    };
  };
}

const businessData: BusinessInfo = {
  name: "CHOCÓ AVENTURAS",
  description: "Somos la primera experiencia de turismo extremo en Quibdó que combina cuatrimotos, paintball y cultura local en plena selva tropical. Vive la adrenalina de recorrer trochas, siente la emoción del combate en escenarios naturales y descubre la magia del Chocó auténtico, todo en un solo lugar. Aquí la aventura no se cuenta… ¡se vive!",
  address: "KM7 VIA YUTO",
  phone: "",
  email: "chocoaventurascuatri@gmail.com",
  schedule: "7am – 5pm",
  socialMedia: {
    facebook: "",
    instagram: "",
    tiktok: ""
  },
  policies: {
    minimumAge: 14,
    requiredDocuments: [
      "Cédula de ciudadanía o tarjeta de identidad",
      "Pasaporte (para turistas extranjeros)"
    ],
    deposit: "Se requiere un depósito del 50% del valor del servicio para reservar la actividad",
    clothingRequirements: [
      "Uso obligatorio de ropa cómoda y resistente",
      "Calzado cerrado y resistente obligatorio",
      "Ropa que se pueda ensuciar"
    ],
    safetyRequirements: [
      "Uso obligatorio de casco provisto por la empresa",
      "Uso obligatorio de chaleco protector",
      "Uso obligatorio de protección adicional provista por la empresa"
    ],
    responsibilityPolicy: "El cliente es responsable por daños ocasionados al equipo por mal uso"
  },
  colors: {
    primary: {
      darkGreen: "#145A32",
      atratoBlue: "#1565C0", 
      gold: "#F1C40F"
    },
    secondary: {
      adrenalineRed: "#E53935",
      vibrantOrange: "#FB8C00"
    },
    neutral: {
      deepBlack: "#212121",
      lightGray: "#F5F5F5",
      pureWhite: "#FFFFFF"
    }
  }
};

// Get business information
export const getInfo = api<void, BusinessInfo>(
  { expose: true, method: "GET", path: "/business/info" },
  async () => {
    return businessData;
  }
);