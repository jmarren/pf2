"use client"

import Image from "next/image"
import TursoLogo from "@/components/TursoLogo"
import { usePaint } from "@/components/PaintContext"
import Link from "next/link"

const Page = () => {
  const { paint } = usePaint()

  return (
    <>
      <Link href="/main" className="absolute z-10 top-[73px] left-[50px] bg-blue-400 rounded-md border-2 text-center text-white border-white px-2 py-2 hover:bg-blue-500 active:scale-95">Back
      </Link>
      <div className="overflow-scroll absolute w-full h-full ">
        <div className="h-10"> </div>
        <div className={`p-24 w-full font-[Sora] ${paint ? "translate-x-full transition ease-in-out " : ""}`} >
          <div className=" bg-white p-10 rounded-lg  max-w-[520px] ">
            <h1 className="text-xl text-center">Stack</h1>
            <div className=" grid grid-rows-3 grid-cols-3 gap-4 max-w-[500px]">
              <Image className="" src="/sqlite-ar21.svg" alt="sqlite-logo" width={100} height={100} />
              <Image src="/HashiCorp-Terraform.svg" alt="terraform-logo" width={100} height={100} >
              </Image>
              <Image src="/AWS.svg" alt="aws-logo" width={100} height={100} ></Image>
              <Image src="/htmx.png" alt="htmx-logo" width={100} height={100} ></Image>
              <Image src="/Go.svg" alt="go-logo" width={100} height={100} ></Image>
              <Image src="/Go-Logo_Blue.png" alt="Go-logo" width={100} height={100} >
              </Image>
              <TursoLogo />
            </div>
          </div>
          <div className="h-10"> </div>
          <div className=" bg-white p-10 rounded-lg  max-w-[520px]">
            <h1 className=" text-xl">Description</h1>
            <p>
              Ask Away is a simple turn-based game. Users can create groups and everyday
              a new person must ask a multiple-choice question with 4 options. Users are assigned points
              based on the number of other users who chose the same option as them.
            </p>
          </div>
          <div className="h-10"> </div>
          <div className="bg-white p-10 rounded-lg  max-w-[520px]">
            <h1 className=" text-xl">Goals</h1>
            <ul>
              <li className="list-disc" >Build my first Go web app</li>
              <li className="list-disc">Learn to use HTMX</li>
              <li className="list-disc">Improve SQL database skills</li>
              <li className="list-disc">Gain greater familiarity with AWS</li>
              <li className="list-disc">Improve Terraform skills</li>
              <li className="list-disc">Build a highly performant, interactive site with minimal Javascript </li>
            </ul>
          </div>
          <div className="h-10"> </div>
          <div className=" bg-white p-10 rounded-lg max-w-[520px]">
            <h1 className="text-xl ">Results</h1>
            <p className="pb-4">
              The site currently only allows usernames from a fixed list. Check back soon for full functionality!
            </p>
            <button >
              <a href='https://ask-away.mechanicalturk.one'
                className="w-full  bg-blue-500 text-white rounded-lg py-2 px-3 text-lg border-2 border-gray-400 hover:bg-blue-600" >
                Visit
              </a>
            </button>
          </div>
        </div>
      </div >
    </>
  )


}

export default Page
