import connectDB from "@/config/database";
import Cabin from "@/models/Cabin";
import Image from "next/image";

export const metadata = {
  title: "Cabins",
};

export default async function page() {
  await connectDB();
  const cabins = await Cabin.find({}).lean();
  console.log(cabins);

  return (
    <div>
      <ul>
        {cabins.map((cabin) => (
          <li key={cabin.name}>
            {`Name: ${cabin.name} Capacity: ${cabin.maxCapacity} Price: ${cabin.regularPrice} Discount: ${cabin.discount} Description: ${cabin.description}`}
            <Image src={cabin.image} height={100} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}
