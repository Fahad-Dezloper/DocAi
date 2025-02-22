// import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

import Navvv from "@/components/dockAi/Navvv";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataProvider } from "@/provider/spaceContext";

import { auth } from "../(auth)/auth";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: {children: React.ReactNode}) => {
  // const router = useRouter();
  let session = await auth()
  // if(!session){
  //   router.push("/register");
  // }
  return (
    <SidebarProvider>
    <main className='flex gap-2 w-screen'>
      <DataProvider>
              <SidebarLeft user={session?.user} />
                  <div className='w-full flex flex-col gap-2'>
                    <Navvv user={session?.user?.email} />
                      {children}
                  </div>
              <SidebarRight user={session?.user} />
            </DataProvider>
      </main>
      </SidebarProvider>
  );
};

export default Layout;
