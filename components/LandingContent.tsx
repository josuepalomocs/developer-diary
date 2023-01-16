import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LandingContentProps {}

export default function LandingContent({}: LandingContentProps) {
  const [textLineAnimationsComplete, setTextLineAnimationsComplete] = useState([
    false,
    false,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setTextLineAnimationsComplete([true, false]);
    }, 1000);

    setTimeout(() => {
      setTextLineAnimationsComplete([true, true]);
    }, 2000);
  }, []);

  return (
    <section className="flex flex-col items-center">
      <p className="text-gray-500 font-bold mb-6 animate-typing line-clamp-1">
        Hello, I&apos;m Josue Palomo.
      </p>
      <p
        className={`text-gray-500 max-w-md mb-6 ${
          textLineAnimationsComplete[0]
            ? "animate-typing line-clamp-1"
            : "hidden"
        }`}
      >
        I built this site to document my developer journey.
      </p>
      <p
        className={`text-gray-500 max-w-md mb-6 ${
          textLineAnimationsComplete[1]
            ? "animate-typing line-clamp-1"
            : "hidden"
        }`}
      >
        Feel free to{" "}
        <Link
          className="text-sky-500 hover:underline"
          href="#articles-begin"
          scroll={false}
        >
          take a look at my articles
        </Link>
        .
      </p>
      <div className="flex gap-4 items-center">
        <Link
          className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
          href="https://github.com/josuepalomocs"
        >
          <Image
            src="/github-icon.svg"
            alt="Github logo"
            width={20}
            height={20}
          />
        </Link>
        <Link
          className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
          href="https://www.linkedin.com/in/josue-palomo/"
        >
          <Image
            src="/linkedin-icon.svg"
            alt="LinkedIn logo"
            width={20}
            height={20}
          />
        </Link>
        <Link
          className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
          href="mailto: josuepalomocs@gmail.com"
        >
          <p className="text-sm text-gray-800">josuepalomocs@gmail.com</p>
        </Link>
      </div>
    </section>
  );
}
