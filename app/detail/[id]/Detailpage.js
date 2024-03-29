"use client";
import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import getRelativeTime from "@/util/SetTime";

export default function Detailpage({ post_data, session }) {
  return (
    <div className="px-6 py-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            <span>{post_data.title}</span>
            <div className="flex items-center gap-2">
              {getRelativeTime(new Date(post_data.publishDate))}
            </div>
          </CardTitle>
          <CardDescription>{post_data.authoremail}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">
            {post_data.content}
          </p>
          <div className="flex items-center justify-end mt-4">
            {session?.user?.email === post_data.useremail ? (
              <Link href={`/edit/${post_data._id}`}>
                <Button size="icon" variant="ghost">
                  <FileEditIcon className="h-5 w-5" />
                </Button>
              </Link>
            ) : null}

            {session?.user?.email === post_data.useremail ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  fetch("/api/delete/delete", {
                    method: "DELETE", // or 'PUT'
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(post_data._id),
                  })
                    .then((res) => {
                      if (res.ok) {
                        window.location.href = "/list/1";
                      } else {
                        throw new Error("Error in delete");
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button className="group" size="sm" variant="ghost">
              <HeartIcon className="h-5 w-5 mr-2 group-hover:fill-red-500" />
              Like{"\n                          "} {post_data.likeCount}
            </Button>

            <Button size="sm" variant="ghost">
              <TextIcon className="h-5 w-5 mr-2" />
              Comment{"\n                          "}
            </Button>
          </div>
          <form method="POST" actions="" className="space-y-4">
            <CardFooter>
              <Textarea placeholder="Write a comment..." />
              <Button className="mt-2">Post Comment</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@JohnDoe</div>
              <div className="text-gray-500 text-xs dark:text-gray-400">
                5 minutes ago
              </div>
            </div>
            <div>Great post! I found it very informative.</div>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">@JaneDoe</div>
                    <div className="text-gray-500 text-xs dark:text-gray-400">
                      3 minutes ago
                    </div>
                  </div>
                  <div>I agree with you, John!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@JaneDoe</div>
              <div className="text-gray-500 text-xs dark:text-gray-400">
                10 minutes ago
              </div>
            </div>
            <div>Thanks for sharing this post. It was really helpful.</div>
            <div className="flex items-center space-x-2 mt-2">
              <Button size="icon" variant="ghost">
                <ReplyIcon className="h-5 w-5" />
              </Button>
              <span className="text-gray-500 dark:text-gray-400">Reply</span>
            </div>
            <div className="mt-2">
              <Textarea placeholder="Write a reply..." />
              <Button className="mt-2">Post Reply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}
function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
function FileEditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
