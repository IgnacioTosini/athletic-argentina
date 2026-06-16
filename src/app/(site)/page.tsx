import { Banner } from "@/components/ui/Banner/Banner";
import { Hero } from "@/components/sections/hero/Hero";
import { ClubsSection } from "@/components/sections/clubsSection/ClubsSection";
import { Process } from "@/components/sections/process/Process";
import { Proposal } from "@/components/sections/proposal/Proposal";
import { Demo } from "@/components/sections/demo/Demo";
import { Doubts } from "@/components/sections/doubts/Doubts";
import { Consultation } from "@/components/sections/consultation/Consultation";
import { getClubs } from "../actions/club.action";

export default async function Home() {
  const clubs = await getClubs();
  return (
    <main>
      <Hero />
      <Banner clubs={clubs} />
      <ClubsSection clubs={clubs} />
      <Process />
      <Proposal />
      <Demo club={clubs[0]} />
      <Doubts />
      <Consultation />
    </main>
  );
}
