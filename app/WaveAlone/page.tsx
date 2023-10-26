// import DotsOnCanvas from "@/components/NameDrawing"
import DotDrawer from "@/components/GreatWaveResize"
import PartialBorderDiv from "@/components/PartialBorders";
// import { Suspense } from "react";
import DotsOnCanvas from '@/components/DrawOneText'

function Page() {
    return (
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>
              <DotDrawer />
              <DotsOnCanvas />
        </div>
      );
}

export default Page;

