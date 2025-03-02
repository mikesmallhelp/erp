import * as z from "zod";

// Osaston validaatio
export const departmentSchema = z.object({
  name: z.string().min(2, { message: "Nimen tulee olla vähintään 2 merkkiä pitkä" }),
  description: z.string().min(5, { message: "Kuvauksen tulee olla vähintään 5 merkkiä pitkä" }),
});

// Työntekijän validaatio
export const employeeSchema = z.object({
  firstName: z.string().min(2, { message: "Etunimen tulee olla vähintään 2 merkkiä pitkä" }),
  lastName: z.string().min(2, { message: "Sukunimen tulee olla vähintään 2 merkkiä pitkä" }),
  email: z.string().email({ message: "Sähköpostiosoite ei ole kelvollinen" }),
  phone: z.string().regex(/^[0-9\-\+\s]{7,15}$/, { message: "Puhelinnumero ei ole kelvollinen" }),
  address: z.object({
    street: z.string().min(3, { message: "Katuosoitteen tulee olla vähintään 3 merkkiä pitkä" }),
    postalCode: z.string().regex(/^[0-9]{5}$/, { message: "Postinumeron tulee sisältää 5 numeroa" }),
    city: z.string().min(2, { message: "Kaupungin nimen tulee olla vähintään 2 merkkiä pitkä" }),
  }),
  departmentId: z.string().min(1, { message: "Osasto on valittava" }),
  position: z.string().min(2, { message: "Tehtävänimikkeen tulee olla vähintään 2 merkkiä pitkä" }),
  salary: z.number().positive({ message: "Palkan tulee olla positiivinen luku" }),
  bankAccount: z.string().regex(/^FI[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{2}$/, {
    message: "Tilinumeron tulee olla muodossa 'FI12 3456 7890 1234 56'"
  }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Päivämäärän on oltava muodossa VVVV-KK-PP" }),
  experience: z.array(z.string()),
  skills: z.array(z.string()),
});

// Tuotteen validaatio
export const productSchema = z.object({
  name: z.string().min(2, { message: "Nimen tulee olla vähintään 2 merkkiä pitkä" }),
  description: z.string().min(5, { message: "Kuvauksen tulee olla vähintään 5 merkkiä pitkä" }),
  sku: z.string().min(4, { message: "Tuotekoodin tulee olla vähintään 4 merkkiä pitkä" }),
  manufacturingCost: z.number().positive({ message: "Valmistushinnan tulee olla positiivinen luku" }),
  retailPrice: z.number().positive({ message: "Myyntihinnan tulee olla positiivinen luku" }),
  stockQuantity: z.number().nonnegative({ message: "Varastomäärän tulee olla vähintään 0" }),
  category: z.string().min(2, { message: "Kategorian tulee olla vähintään 2 merkkiä pitkä" }),
  features: z.array(z.string()),
  imageUrl: z.string().url({ message: "Kuvan URL-osoite ei ole kelvollinen" }).or(z.string().startsWith("/", { message: "Kuvan URL-osoite ei ole kelvollinen" })),
});