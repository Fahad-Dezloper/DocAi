import React from 'react'

import { Chat } from "@/components/custom/chat";
import { generateUUID } from "@/lib/utils";
import Navvv from '@/components/dockAi/Navvv';

const page = async () => {
     const id = generateUUID();
  return (
    <>
    <Chat key={id} id={id} initialMessages={[]} />
    </>
  )
}

export default page