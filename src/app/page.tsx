import MainComponents from "@/components/MainComponents";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="min-h-[calc(100vh-96px)]">
        <MaxWidthWrapper>
          <div className="py-12 flex flex-col items-center">
            <p className="text-7xl text-foreground font-bold">
              Currency Converter
            </p>
            <p className="w-[70%] mt-6 text-center font-mono">
              Currency conversion and exchange rate history. Easily convert
              currencies and delve into their historical trends, empowering you
              to make informed financial decisions.
            </p>
          </div>
          <MainComponents />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
