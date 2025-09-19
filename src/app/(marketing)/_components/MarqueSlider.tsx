import Image from "next/image";
import gsapIcon from "../../../../public/slide-icons/gsap.svg";
import nextjsIcon from "../../../../public/slide-icons/next.svg";
import reactIcon from "../../../../public/slide-icons/react.svg";
import tailwindIcon from "../../../../public/slide-icons/tailwind.svg";
import vercelIcon from "../../../../public/vercel.svg";
import threeIcon from "../../../../public/slide-icons/three.svg";
import typescriptIcon from "../../../../public/slide-icons/typescript.svg";
import cpp from "../../../../public/slide-icons/cpp.svg";
import css from "../../../../public/slide-icons/css.svg";
import github from "../../../../public/slide-icons/github.svg";
import graphql from "../../../../public/slide-icons/graphql.svg";
import stripe from "../../../../public/slide-icons/stripe.svg";
import supabase from "../../../../public/slide-icons/supabase.svg";
import js from "../../../../public/slide-icons/js.svg";
import Marquee from "react-fast-marquee";

type SliderRow = {
  id: number;
  direction: "left" | "right";
  images: { src: string; alt: string }[];
};

export function MarqueSlider() {
  const sliderRows: SliderRow[] = [
    {
      id: 1,
      direction: "left",
      images: [
        { src: gsapIcon, alt: "GSAP" },
        { src: nextjsIcon, alt: "Next.js" },
        { src: reactIcon, alt: "React" },
        { src: tailwindIcon, alt: "Tailwind CSS" },
        { src: css, alt: "CSS" },
        { src: github, alt: "GitHub" },
        { src: graphql, alt: "GraphQL" },
      ],
    },
    {
      id: 2,
      direction: "right",
      images: [
        { src: vercelIcon, alt: "Vercel" },
        { src: threeIcon, alt: "Three.js" },
        { src: typescriptIcon, alt: "TypeScript" },
        { src: cpp, alt: "C++" },
        { src: stripe, alt: "Stripe" },
        { src: supabase, alt: "Supabase" },
        { src: js, alt: "JavaScript" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {sliderRows.map((row) => (
        <Marquee
          key={row.id}
          gradient={false}
          speed={50}
          pauseOnHover
          direction={row.direction}
          className="w-full"
        >
          <div className="flex items-center gap-16 px-8">
            {row.images.map((image, i) => (
              <div
                key={i}
                className="h-12 w-24 flex items-center justify-center shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="max-h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
        </Marquee>
      ))}
    </div>
  );
}
