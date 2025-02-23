"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import MessageLoading from "./message-loading";
import { PreviewAttachment } from "./preview-attachment";
import ToolRecommendations from "../dockAi/ToolRecommendations";

export const Message = ({
  chatId,
  role,
  content,
  toolInvocations,
  attachments,
}: {
  chatId: string;
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-5 w-full h-full first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >

      <div className={`flex flex-col gap-2 w-full  ${role == "assistant" ? "" : "items-end"}`}>
        {content && typeof content === "string" && (
          <div className={`${role == "assistant" ? "text-black" : "max-w-[30vw] p-2  border-r-[3px]  border-blue-300 font-semibold hover:rounded-xl hover:bg-gray-100 hover:text-black text-black duration-200"}`}>{content}</div>
        )}

        {toolInvocations && (
          <div className="flex flex-col gap-4 h-fit">
            {toolInvocations.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                const { result } = toolInvocation;

                return (
                  <div key={toolCallId}>
                    {toolName === "combinedQueryTool" ? (
                      <ToolRecommendations recommendations={result} />
                    ) : (
                      <div>{JSON.stringify(result, null, 2)}</div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={toolCallId} className="skeleton">
                    {toolName === "combinedQueryTool" ? (
                      <MessageLoading />
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}

        {attachments && (
          <div className="flex flex-row gap-2">
            {attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
