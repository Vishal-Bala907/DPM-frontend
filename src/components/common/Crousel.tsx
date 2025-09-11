import Glide, {
  Controls,
  Breakpoints,
} from "@glidejs/glide/dist/glide.modular.esm";
import { useEffect } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
// import { CROUSEL } from "../../data/crousel.data";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import CTAPrimaryButton from "../customizable/CTAPrimaryButton";
import STAPrimaryButton from "../customizable/STAPrimaryButton";

type Props = {
  CROUSEL: string[];
};

const Crousel: React.FC<Props> = ({ CROUSEL }) => {
  useEffect(() => {
    new Glide(".glide").mount({ Controls, Breakpoints });
  }, []);
  return (
    <div className="after:relative relative">
      <div className="glide after:absolute after:inset-0 after:top-0 after:left-0 after:h-full after:w-full after:bg-black after:opacity-50">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {CROUSEL.map((_, index) => (
              <li className="glide__slide" key={index}>
                <img
                  src={`${_}`}
                  alt="Image 1"
                  className="w-[100%] max-h-[600px] md:h-[600px] h-[500px] object-cover"
                />
              </li>
            ))}
          </ul>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {CROUSEL.map((_, index) => (
              <button
                className="glide__bullet"
                data-glide-dir={`=${index}`}
                key={index}
              ></button>
            ))}
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left rounded-full"
              data-glide-dir="<"
              style={{
                borderRadius: "90%",
                backgroundColor: "white",
              }}
            >
              <ArrowBigLeft color="black" />
            </button>
            <button
              className="glide__arrow glide__arrow--right "
              data-glide-dir=">"
              style={{
                borderRadius: "90%",
                backgroundColor: "white",
              }}
            >
              <ArrowBigRight color="black" />
            </button>
          </div>
        </div>
      </div>
      <CrouselTextContent
        title="Track Your Daily Progress. Stay Organized. Achieve More"
        description="A simple yet powerful tool for individuals and organizations to log work, monitor productivity, and stay on top of goals."
      />
    </div>
  );
};

function CrouselTextContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  inset-0 flex flex-col items-center justify-center text-white">
      <h2 className="md:text-4xl text-2xl font-bold text-center">{title}</h2>
      <p className="mt-2 text-center">{description}</p>
      <div className="mt-4 flex flex-row flex-wrap justify-center gap-4">
        <CTAPrimaryButton text="Get Started" />
        <STAPrimaryButton text="View Pricing" />
        {/* <Button text="View Pricing" /> */}
      </div>
    </div>
  );
}

export default Crousel;

// export { CrouselTextContent };
