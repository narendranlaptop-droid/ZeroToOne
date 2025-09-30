import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
       {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              The Zero. Journey to One
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Created by Prafulla
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
