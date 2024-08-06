import Image from "next/image"
import TursoLogo from "@/components/TursoLogo"


const Page = () => {

  return (
    <div className="">
      <Image src="/sqlite-ar21.svg" alt="sqlite-logo" width={100} height={100} />
      <Image src="/HashiCorp-Terraform.svg" alt="terraform-logo" width={100} height={100} ></Image>
      <Image src="/AWS.svg" alt="aws-logo" width={100} height={100} ></Image>
      <Image src="/htmx.png" alt="htmx-logo" width={100} height={100} ></Image>
      <Image src="/Go.svg" alt="go-logo" width={100} height={100} ></Image>
      <Image src="/Go-Logo_Blue.png" alt="Go-logo" width={100} height={100} ></Image>
      <TursoLogo />
      <div>
        About Ask Away
      </div>
    </div>

  )


}

export default Page
