import { Department, Employee, Product } from './types';

// Osastot
export const departments: Department[] = [
  {
    id: '1',
    name: 'Hallinto',
    description: 'Yrityksen johto ja hallinnolliset toiminnot'
  },
  {
    id: '2',
    name: 'Myynti',
    description: 'Asiakashankinta ja myynti'
  },
  {
    id: '3',
    name: 'Tuotekehitys',
    description: 'Uusien tuotteiden suunnittelu ja kehitys'
  },
  {
    id: '4',
    name: 'Tuotanto',
    description: 'Tuotteiden valmistus'
  },
  {
    id: '5',
    name: 'Markkinointi',
    description: 'Brändin kehitys ja markkinointikampanjat'
  }
];

// Työntekijät
export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'Matti',
    lastName: 'Meikäläinen',
    email: 'matti.meikalainen@firma.fi',
    phone: '040-1234567',
    address: {
      street: 'Kauppakatu 10',
      postalCode: '00100',
      city: 'Helsinki'
    },
    departmentId: '1',
    position: 'Toimitusjohtaja',
    salary: 6500,
    bankAccount: 'FI21 1234 5678 9012 34',
    startDate: '2020-01-01',
    experience: ['Yrittäjä 5v', 'Johtotehtävät 10v'],
    skills: ['Johtaminen', 'Strategia', 'Neuvottelu']
  },
  {
    id: '2',
    firstName: 'Liisa',
    lastName: 'Virtanen',
    email: 'liisa.virtanen@firma.fi',
    phone: '050-7654321',
    address: {
      street: 'Teollisuuskatu 25',
      postalCode: '00510',
      city: 'Helsinki'
    },
    departmentId: '2',
    position: 'Myyntipäällikkö',
    salary: 4800,
    bankAccount: 'FI33 9876 5432 1098 76',
    startDate: '2021-03-15',
    experience: ['Myyntiedustaja 8v'],
    skills: ['B2B myynti', 'Asiakassuhteet', 'Neuvottelu']
  },
  {
    id: '3',
    firstName: 'Jukka',
    lastName: 'Korhonen',
    email: 'jukka.korhonen@firma.fi',
    phone: '045-9876543',
    address: {
      street: 'Kaisaniemenkatu 4',
      postalCode: '00100',
      city: 'Helsinki'
    },
    departmentId: '3',
    position: 'Tuotekehitysinsinööri',
    salary: 4200,
    bankAccount: 'FI45 5678 9012 3456 78',
    startDate: '2022-01-10',
    experience: ['Tuotekehitys 6v', 'Laadunvalvonta 3v'],
    skills: ['CAD-suunnittelu', 'Prototyypit', 'Innovaatio']
  },
  {
    id: '4',
    firstName: 'Anna',
    lastName: 'Mäkinen',
    email: 'anna.makinen@firma.fi',
    phone: '041-2345678',
    address: {
      street: 'Porthaninkatu 9',
      postalCode: '00530',
      city: 'Helsinki'
    },
    departmentId: '4',
    position: 'Tuotantovastaava',
    salary: 3900,
    bankAccount: 'FI54 3210 9876 5432 10',
    startDate: '2021-08-01',
    experience: ['Tuotantotyöntekijä 5v', 'Esimiestehtävät 3v'],
    skills: ['Prosessien kehitys', 'Laadunvalvonta', 'Tiimityö']
  },
  {
    id: '5',
    firstName: 'Pekka',
    lastName: 'Koskinen',
    email: 'pekka.koskinen@firma.fi',
    phone: '050-8765432',
    address: {
      street: 'Albertinkatu 12',
      postalCode: '00120',
      city: 'Helsinki'
    },
    departmentId: '5',
    position: 'Markkinointikoordinaattori',
    salary: 3700,
    bankAccount: 'FI66 7890 1234 5678 90',
    startDate: '2022-05-15',
    experience: ['Digimarkkinointi 4v', 'Sisällöntuotanto 2v'],
    skills: ['Sosiaalinen media', 'Sisältöstrategia', 'Kampanjat']
  }
];

// Tuotteet
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Kahvipaketti',
    description: 'Korkealaatuinen kahvipapusekoitus vaativaan makuun',
    sku: 'COFFEE-001',
    manufacturingCost: 8.50,
    retailPrice: 14.95,
    stockQuantity: 150,
    category: 'Kahvit',
    features: ['100% Arabica', 'Pienpaahdettu', 'Reilu kauppa'],
    imageUrl: '/images/coffee-premium.jpg'
  },
  {
    id: '2',
    name: 'Luomu Teekokoelma',
    description: 'Valikoima luomulaatuisia teelaatuja eri puolilta maailmaa',
    sku: 'TEA-201',
    manufacturingCost: 10.20,
    retailPrice: 18.95,
    stockQuantity: 85,
    category: 'Teet',
    features: ['Luomu', '5 eri makua', 'Pakkaus sisältää 50 teepussia'],
    imageUrl: '/images/tea-collection.jpg'
  },
  {
    id: '3',
    name: 'Keramiikka Kahvimuki',
    description: 'Käsintehty kestävä keramiikkamuki jokapäiväiseen käyttöön',
    sku: 'MUG-101',
    manufacturingCost: 6.70,
    retailPrice: 12.95,
    stockQuantity: 200,
    category: 'Astiat',
    features: ['Käsintehty', 'Konepesun kestävä', 'Tilavuus 3,5 dl'],
    imageUrl: '/images/ceramic-mug.jpg'
  },
  {
    id: '4',
    name: 'Kahvinkeittopaketti',
    description: 'Täydellinen aloituspaketti pour-over kahvin valmistukseen',
    sku: 'BREW-301',
    manufacturingCost: 32.50,
    retailPrice: 59.95,
    stockQuantity: 45,
    category: 'Laitteet',
    features: ['Sisältää keraamisen suodattimen', 'Lasinen keittopullo', 'Tarkkuusvaaka'],
    imageUrl: '/images/brewing-kit.jpg'
  },
  {
    id: '5',
    name: 'Käsintehty Teepannu',
    description: 'Tyylikäs valurautainen teepannu perinteiseen teehetkeen',
    sku: 'TEA-401',
    manufacturingCost: 18.30,
    retailPrice: 34.95,
    stockQuantity: 60,
    category: 'Laitteet',
    features: ['Valurauta', 'Japanilainen design', 'Tilavuus 0,7l'],
    imageUrl: '/images/teapot.jpg'
  },
  {
    id: '6',
    name: 'Kahvipapumylly',
    description: 'Ammattilaistason manuaalinen kahvimylly tasaiseen jauhatukseen',
    sku: 'GRIND-101',
    manufacturingCost: 28.60,
    retailPrice: 49.95,
    stockQuantity: 40,
    category: 'Laitteet',
    features: ['Keraaminen terä', 'Säädettävä karkeus', 'Ruostumaton teräs'],
    imageUrl: '/images/coffee-grinder.jpg'
  }
];