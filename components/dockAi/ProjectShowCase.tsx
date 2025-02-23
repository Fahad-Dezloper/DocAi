import Link from "next/link"

export const ProjectShowCase = () => {
    return (
        <div style={{ backgroundImage: "" }} className="max-h-[35vh] w-full relative gradient flex items-center justify-center">
            <div className="flex flex-col w-full h-full items-center py-4 gap-4">
            <Link href="ui.aceternity.com" target="_blank" className="h-full cursor-pointer rounded-xl overflow-hidden">
                <img src="/doctor/doctor3d.png" alt="" className="w-full h-full object-cover" />
            </Link>
            <div className="w-fit p-3 flex flex-col gap-2 absolute bottom-0 rounded-t-md bg-black opacity-80">
            <div>
            <h2 className="font-semibold">No Scheduled Meeting</h2>
            {/* <h3 className="text-sm"></h3> */}
            </div>
            </div>
            </div>
        {/* <h1 className="w-fit p-3 h-9 bg-black text-xs text-white absolute bottom-0 rounded-t-md">Project of the day</h1> */}
        </div>
    )
}