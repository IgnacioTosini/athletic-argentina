import { getClubBySlug } from "@/app/actions/club.action";
import { ClubInfo } from "@/components/clubPage/clubInfo/ClubInfo";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ClubPage({ params }: Props) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }
  return (
    <div>
      <ClubInfo club={club} />
    </div>
  );
}