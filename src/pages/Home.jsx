import Feeds from "../../UI/Feeds";
import StatusBar from "../../UI/StatusBar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <StatusBar />

      <main className="h-[80vh] overflow-y-auto no-scrollbar ">
        <Feeds />
      </main>
    </div>
  );
}
