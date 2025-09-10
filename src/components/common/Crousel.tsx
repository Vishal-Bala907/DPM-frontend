import Glide, {
  Controls,
  Breakpoints,
} from "@glidejs/glide/dist/glide.modular.esm";
import { useEffect } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
// import { CROUSEL } from "../../data/crousel.data";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

type Props = {
  CROUSEL: string[];
};

const Crousel: React.FC<Props> = ({ CROUSEL }) => {
  useEffect(() => {
    new Glide(".glide").mount({ Controls, Breakpoints });
  }, []);
  return (
    <div>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {CROUSEL.map((_, index) => (
              <li className="glide__slide" key={index}>
                <img
                  src={`${_}`}
                  alt="Image 1"
                  className="w-[100%] max-h-[400px] object-contain"
                  style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "cover",
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {CROUSEL.map((_, index) => (
              <button
                className="glide__bullet"
                data-glide-dir={`=${index}`}
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
    </div>
  );
};

export default Crousel;
