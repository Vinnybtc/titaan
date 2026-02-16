import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import StatsBar from "@/components/public/StatsBar";
import Filosofie from "@/components/public/Filosofie";
import Portfolio from "@/components/public/Portfolio";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings([
    "hero_heading",
    "hero_subtitle",
    "hero_cta",
    "stats_years",
    "stats_years_label",
    "stats_portfolio",
    "stats_portfolio_label",
    "stats_portfolio_prefix",
    "stats_portfolio_suffix",
    "stats_projects",
    "stats_projects_label",
    "filosofie_heading",
    "filosofie_subtitle",
    "filosofie_card1_title",
    "filosofie_card1_desc",
    "filosofie_card2_title",
    "filosofie_card2_desc",
    "contact_heading",
    "contact_subtitle",
    "contact_email",
    "contact_phone",
    "contact_address",
    "portfolio_heading",
    "portfolio_subtitle",
  ]);

  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  const stats = [
    {
      value: parseInt(settings.stats_years || "25"),
      suffix: "+",
      label: settings.stats_years_label || "Jaar ERVARING",
    },
    {
      value: parseInt(settings.stats_portfolio || "250"),
      prefix: settings.stats_portfolio_prefix || "€",
      suffix: settings.stats_portfolio_suffix || "M+",
      label: settings.stats_portfolio_label || "PORTFOLIO WAARDE",
    },
    {
      value: parseInt(settings.stats_projects || "40"),
      suffix: "+",
      label: settings.stats_projects_label || "PROJECTEN VOLTOOID",
    },
  ];

  return (
    <main>
      <Navbar />
      <Hero
        heading={settings.hero_heading || "Building Legacies."}
        subtitle={
          settings.hero_subtitle ||
          "Titaan Development is gespecialiseerd in het ontwikkelen en beheren van hoogwaardig vastgoed."
        }
        cta={settings.hero_cta || "BEKIJK PROJECTEN"}
      />
      <StatsBar stats={stats} />
      <Filosofie
        subtitle={settings.filosofie_subtitle || "ONZE FILOSOFIE"}
        heading={settings.filosofie_heading || "Investeren in kwaliteit en karakter."}
        card1Title={settings.filosofie_card1_title || "Stedelijke Ontwikkeling"}
        card1Desc={settings.filosofie_card1_desc || ""}
        card2Title={settings.filosofie_card2_title || "Duurzame Waarde"}
        card2Desc={settings.filosofie_card2_desc || ""}
      />
      <Portfolio
        subtitle={settings.portfolio_subtitle || "GESELECTEERD WERK"}
        heading={settings.portfolio_heading || "Huidig Portfolio"}
        projects={projects}
      />
      <Contact
        heading={settings.contact_heading || "Geïnteresseerd in samenwerking?"}
        subtitle={settings.contact_subtitle || ""}
        email={settings.contact_email || "info@titaan.dev"}
        phone={settings.contact_phone || "+31 (0)70 123 4567"}
        address={settings.contact_address || "Den Haag, NL"}
      />
      <Footer />
    </main>
  );
}
