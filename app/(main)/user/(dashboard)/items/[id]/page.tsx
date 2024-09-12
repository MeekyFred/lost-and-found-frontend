import React from "react";

import { ItemDetail } from "@/app/exports/exports";

function ItemDetailPage({ params }: { params: { id: string } }) {
  return <ItemDetail id={params.id} />;
}

export default ItemDetailPage;
