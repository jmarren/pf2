import DotsOnCanvas from "@/components/NameDrawing";


function Page() {
    return (
        <div className='bg-sky-100 w-full h-full min-h-screen fixed top-0'>
              <DotsOnCanvas fontSize={100} textColor={'#98a3a1'} text={'John Marren - Web Developer'} header={true}/>
        </div>
      );
}

export default Page;

