import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@titaan.nl" },
    update: {},
    create: {
      email: "admin@titaan.nl",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Create projects
  const projects = [
    {
      title: "The Hague Central",
      category: "COMMERCIËLE HERONTWIKKELING",
      location: "Den Haag, NL",
      image: "/images/projects/hague-central.svg",
      description:
        "Een ambitieus herontwikkelingsproject in het hart van Den Haag, waar historische architectuur wordt gecombineerd met moderne commerciële ruimtes.",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Residence De Vesting",
      category: "LUXE WONINGBOUW",
      location: "Wassenaar, NL",
      image: "/images/projects/residence-vesting.svg",
      description:
        "Exclusieve woningen in het prestigieuze Wassenaar, ontworpen met oog voor detail en omgeven door weelderig groen.",
      featured: true,
      sortOrder: 2,
    },
    {
      title: "Logistics Hub West",
      category: "INDUSTRIEEL",
      location: "Rotterdam, NL",
      image: "/images/projects/logistics-hub.svg",
      description:
        "Een state-of-the-art logistiek centrum in de Rotterdamse haven, strategisch gelegen voor internationale distributie.",
      featured: true,
      sortOrder: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.title.toLowerCase().replace(/\s+/g, "-") },
      update: project,
      create: { id: project.title.toLowerCase().replace(/\s+/g, "-"), ...project },
    });
  }

  // Create site settings
  const settings = [
    { key: "hero_heading", value: "Building Legacies." },
    {
      key: "hero_subtitle",
      value:
        "Titaan Development is gespecialiseerd in het ontwikkelen en beheren van hoogwaardig vastgoed. Wij creëren duurzame waarde door strategische investeringen in premium locaties.",
    },
    { key: "hero_cta", value: "BEKIJK PROJECTEN" },
    { key: "stats_years", value: "25" },
    { key: "stats_years_label", value: "Jaar ERVARING" },
    { key: "stats_portfolio", value: "250" },
    { key: "stats_portfolio_label", value: "PORTFOLIO WAARDE" },
    { key: "stats_portfolio_prefix", value: "€" },
    { key: "stats_portfolio_suffix", value: "M+" },
    { key: "stats_projects", value: "40" },
    { key: "stats_projects_label", value: "PROJECTEN VOLTOOID" },
    { key: "filosofie_heading", value: "Investeren in kwaliteit en karakter." },
    { key: "filosofie_subtitle", value: "ONZE FILOSOFIE" },
    {
      key: "filosofie_card1_title",
      value: "Stedelijke Ontwikkeling",
    },
    {
      key: "filosofie_card1_desc",
      value:
        "Wij transformeren stedelijke gebieden door innovatieve herontwikkeling, waarbij we de balans bewaken tussen modern comfort en historisch karakter.",
    },
    {
      key: "filosofie_card2_title",
      value: "Duurzame Waarde",
    },
    {
      key: "filosofie_card2_desc",
      value:
        "Onze projecten zijn ontworpen om blijvende waarde te creëren — zowel financieel als maatschappelijk — voor investeerders en gemeenschappen.",
    },
    { key: "contact_email", value: "info@titaan.dev" },
    { key: "contact_phone", value: "+31 (0)70 123 4567" },
    { key: "contact_address", value: "Lange Voorhout 10, 2514 ED Den Haag" },
    {
      key: "contact_heading",
      value: "Geïnteresseerd in samenwerking?",
    },
    {
      key: "contact_subtitle",
      value:
        "Neem contact met ons op voor meer informatie over onze projecten, investeringsmogelijkheden of een persoonlijk gesprek.",
    },
    { key: "portfolio_heading", value: "Huidig Portfolio" },
    { key: "portfolio_subtitle", value: "GESELECTEERD WERK" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
