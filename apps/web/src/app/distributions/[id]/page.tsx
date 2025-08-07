"use client";

import { useParams } from "next/navigation";
import DistributionDetailContainer from "../../../containers/DistributionDetailContainer";

export default function DistributionDetailsPage() {
  const params = useParams();

  return <DistributionDetailContainer params={{ id: params.id as string }} />;
}
