import { Metadata } from "next";
import { getClubBySlug } from "@/app/actions/club.action";
import { ClubInfo } from "@/components/clubPage/clubInfo/ClubInfo";
import { ImageType } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const club = await getClubBySlug(slug);

  if (!club) {
    return {
      title: "Club no encontrado",
    };
  }

  const banner =
    club.images.find(
      (image) => image.type === ImageType.BANNER
    )?.url || "/banner2.jpg";

  const title = `${club.name} | Athletic Argentina`;

  const description =
    club.description ||
    `Conocé la tienda oficial de ${club.name} en Athletic Argentina.`;

  return {
    title,
    description,
    keywords: [
      club.name,
      "indumentaria deportiva",
      "tienda oficial",
      "Athletic Argentina",
      club.city || "",
      club.discipline || "",
    ],
    alternates: {
      canonical: `https://athletic-argentina.vercel.app/clubes/${club.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `https://https://athletic-argentina.vercel.app/clubes/${club.slug}`,
      images: [
        {
          url: banner,
          width: 1200,
          height: 630,
          alt: club.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [banner],
    },
  };
}

export default async function ClubPage({
  params,
}: Props) {
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