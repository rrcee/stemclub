import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <div className={cn("w-full relative h-screen bg-[#2596be]")}>
      {/* Clean architectural grid pattern on #2596be */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#2596be] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>
    </div>
  );
};
