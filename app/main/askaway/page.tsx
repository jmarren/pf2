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
            <div className="pb-4">
              <iframe
                src="https://www.youtube.com/embed/saJIswjbRVs?si=Am4GWULkVleVD2YJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              >
              </iframe>
            </div>
            <div className="flex items-center">
              <button>
                <a href='https://ask-away.mechanicalturk.one'
                  className="w-full  bg-blue-500 text-white rounded-lg py-2 px-3 text-lg border-2 border-gray-400 hover:bg-blue-600" >
                  Visit
                </a>
              </button>
              <button>
                <Link href="https://github.com/jmarren/marren-games" target='blank' className="social-button github">
                  <svg className="cf-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19"><path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path></svg>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  )


}

export default Page
