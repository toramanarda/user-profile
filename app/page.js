import Loading from "@/components/loading";
import Page from "./blog/page";
import { Suspense } from "react";

export default function Home() {

  // return redirect("/hakkimda")
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Page />
      </Suspense>
    </div>
  );
}
