import Image from "next/image";
import loaderImg from "@/public/icons8-iphone-spinner-96.png";

export default function Loader() {
  return (
    <Image
      src={loaderImg}
      alt="loading spinner"
      className="w[96px] h[96px]"
      width={96}
      height={96}
    />
  );
}
