import connectDB from "@/config/database";
import Cabin from "@/models/Cabin";
import CabinCard from "@/app/_components/CabinCard";

export const metadata = {
  title: "Cabins",
};

export default async function Page() {
  await connectDB();
  const cabins = await Cabin.find({}).lean();

  return (
    <div className="grid grid-cols-2 gap-5">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.name} />
      ))}
    </div>
  );
}
