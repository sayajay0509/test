import ListBar from "@/app/list/ListBar";

import React from "react";
import Detailpage from "./Detailpage";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function page(props) {
  let db = (await connectDB).db("forum");
  let post_data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params) });

  return (
    <div>
      <ListBar title="User Community" NameofButton="New Post" />
      <Detailpage props={props} post_data={post_data} />
    </div>
  );
}
