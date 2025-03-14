import connectDB from "@/config/database";
import Cabin from "@/models/Cabin";
import CabinCard from "@/app/_components/CabinCard";

export default async function CabinList() {
  await connectDB();
  const cabins = await Cabin.find({}).lean();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cabins.length > 0 &&
        cabins.map((cabin) => <CabinCard cabin={cabin} key={cabin.name} />)}
    </div>
  );
}
