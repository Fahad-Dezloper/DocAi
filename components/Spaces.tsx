"use client"
import { Check, ChevronRight } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import {
  SidebarGroup,
} from "@/components/ui/sidebar"
import { DataContext } from "@/provider/spaceContext"

import SpacesDialog from "./custom/spacesDialog"
import { GlareCard } from "./ui/glare-card"

export function Spaces() {
  const hardcodedSpacesData = [
    { id: 1, name: "Space A", icon: "🔥" },
  ];

  const [spacesData, setSpacesData] = React.useState(hardcodedSpacesData);
  const [openSpace, setOpenSpace] = React.useState(null);

  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("DataInput must be used within a DataProvider");
  }

  function showpopOver(spaceId) {
    setOpenSpace(prev => (prev === spaceId ? null : spaceId));
  }

  return (
    <>
      {spacesData.length > 0 ? (
        spacesData.map((space, index) => (
          <React.Fragment key={space.id}>
            <SidebarGroup className="p-2">
              <GlareCard onClick={() => showpopOver(space.id)} name={space.name} icon={space.icon} num={index + 1} />
            </SidebarGroup>
            {openSpace === space.id && (
              <div className="fixed inset-0 z-50 bg-black/50">
                <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80vw] h-[80vh] bg-[#18181B] rounded-2xl z-[80]">
                  <SpacesDialog spaceName={space.name} spaceIdd={space.id} setPopOver={setOpenSpace} popOver={openSpace} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
