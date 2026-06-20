import type { Metadata } from 'next';

interface Props {
  params: Promise<{ roomCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomCode } = await params;
  const code = roomCode.toUpperCase();
  
  const title = `Entrar na co-op ${code}`;
  const fullTitle = `O Prefeito — ${title}`;
  const description = `Você foi convidado para construir uma cidade juntos! Entre na sala ${code} para começar.`;

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: 'O Prefeito',
      images: ['/opengraph-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default function CoopRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
