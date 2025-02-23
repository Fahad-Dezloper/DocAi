import { getCalApi } from "@calcom/embed-react";
  import { useEffect } from "react";

import { Button } from "../ui/button";
  export default function CalCom() {
	useEffect(()=>{
	  (async function () {
		const cal = await getCalApi({"namespace":"15min"});
		cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
	  })();
	}, [])
	return <Button className="mt-2" data-cal-namespace="15min"
	  data-cal-link="fahad-n8uphu/15min"
    
	  data-cal-config='{"layout":"month_view"}'
	  >Schedule a Meeting</Button>;
  };
  