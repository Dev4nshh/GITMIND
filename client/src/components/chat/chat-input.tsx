import type { ChatStatus } from "ai";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "../ai-elements/prompt-input";
import { GitBranch, GitPullRequest } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import githubLogo from "@/assets/github.svg";
import { connectGithub } from "@/lib/api";
import { cn } from "@/lib/utils";

type SelectedRepo = {
  value: string;
  defaultBranch: string;
};

type PullRequestReady = {
  slugId: string;
  title: string;
  body: string;
  branch: string;
};

type ChatInputProps = {
  status: ChatStatus;
  repo: SelectedRepo | null;
  setRepo: (value: string) => void;
  branchName: string | null;
  prReady: PullRequestReady | null;
  createdPrUrl: string | null;
  hasMessages: boolean;
  isGithubConnected: boolean;
  isFetchingRepos: boolean;
  repoOptions: Array<{ value: string; label: string; defaultBranch: string }>;
  sandboxOptions: Array<{ value: string; label: string }>;
  onSubmit: (message: PromptInputMessage, options?: any) => void;

  onStop: () => void;
  onCreatePr: () => void;
  isCreatingPr: boolean;
};

const ChatInput = ({
  repo,
  setRepo,
  branchName,
  prReady,
  createdPrUrl,
  hasMessages,
  isGithubConnected,
  isFetchingRepos,
  status,
  onSubmit,
  onStop,
  onCreatePr,
  repoOptions,
  sandboxOptions,
  isCreatingPr,
}: ChatInputProps) => {
  const isRepoSelectLocked = isFetchingRepos || hasMessages;
  const repoLabel = repoOptions?.find(
    (option) => option.value === repo?.value,
  )?.label;

  const handlePromptSubmit = (message: PromptInputMessage) => {
    return onSubmit(message);
  };

  const handleConnect = async () => {
    const { url } = await connectGithub();
    window.location.href = url;
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 shrink-0">
      <div className={cn("w-full mx-auto px-0 pb-4 backdrop-blur-sm rounded-2xl",
        hasMessages ? "max-w-212" : "max-w-3xl"
      )}>
        {isGithubConnected && branchName && repo && (
          <div
            className="mb-2 flex items-center justify-between gap-3 
        rounded-2xl border border-border bg-transparent px-4 py-1.5 shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full border border-border bg-muted/50">
                <GitBranch className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[14.5px] font-medium">
                  {prReady?.branch || branchName}
                </p>
              </div>
            </div>

            {createdPrUrl ? (
              <Button className="bg-black/70! text-white" asChild>
                <a href={createdPrUrl} target="_blank" rel="noreferrer">
                  <GitPullRequest className="size-4" />
                  View PR
                </a>
              </Button>
            ) : (
              <Button
                className="bg-black/70! text-white"
                onClick={onCreatePr}
                disabled={isCreatingPr || !prReady}
              >
                {isCreatingPr ? (
                  <>
                    <Spinner className="size-4" />
                    Creating PR...
                  </>
                ) : (
                  <>
                    <GitPullRequest className="size-4" />
                    {prReady ? "Create PR" : "PR unavailable"}
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        <PromptInput
          className="border px-0 bg-background py-0 shadow-sm rounded-3xl!"
          onSubmit={handlePromptSubmit}
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask GitMind to write anything..." />
          </PromptInputBody>
          <PromptInputFooter className="mt-3 flex items-center gap-3">
            <PromptInputTools>
              {isGithubConnected ? (
                hasMessages ? (
                  <Button
                    type="button"
                    variant="outline"
                    //disabled
                    className="bg-transparent! cursor-not-allowed! opacity-50!"
                  >
                    {isFetchingRepos ? (
                      <Spinner />
                    ) : (
                      <img src={githubLogo} alt="" className="size-4" />
                    )}
                    <span className="min-w-0 truncate">
                      {repoLabel ?? "Select a repository"}
                    </span>
                  </Button>
                ) : (
                  <PromptInputSelect
                    value={repo?.value ?? ""}
                    onValueChange={setRepo}
                  >
                    <PromptInputSelectTrigger
                      aria-disabled={isRepoSelectLocked}
                      data-disabled={isRepoSelectLocked ? "" : undefined}
                      className={`h-10 truncate min-w-70 bg-background px-3 ${
                        isRepoSelectLocked
                          ? "cursor-not-allowed opacity-60"
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isFetchingRepos ? (
                          <Spinner />
                        ) : (
                          <img src={githubLogo} alt="" className="size-4" />
                        )}
                        <PromptInputSelectValue placeholder="Select a repository" />
                      </span>
                    </PromptInputSelectTrigger>
                    <PromptInputSelectContent className="shadow-lg">
                      <div className="font-semibold text-sm p-3">
                        All repositories
                      </div>

                      {repoOptions?.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground p-3">
                          No repositories found
                        </div>
                      ) : (
                        repoOptions.map((option) => (
                          <PromptInputSelectItem
                            key={option.value}
                            value={option.value}
                            className="block rounded-lg px-3 py-2"
                          >
                            <span className="truncate max-w-[600px]">
                              {option.label}
                            </span>
                          </PromptInputSelectItem>
                        ))
                      )}
                    </PromptInputSelectContent>
                  </PromptInputSelect>
                )
              ) : (
                <Button variant="outline" type="button" onClick={handleConnect}>
                  <span className="flex items-center gap-2">
                    <img src={githubLogo} alt="" className="size-4" />
                    Connect GitHub
                  </span>
                </Button>
              )}

              <PromptInputSelect defaultValue="sandbox">
                <PromptInputSelectTrigger className="h-10 min-w-32 px-3">
                  <PromptInputSelectValue placeholder="Sandbox" />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {sandboxOptions.map((option) => (
                    <PromptInputSelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-lg px-3 py-2"
                    >
                      {option.label}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>


            <div className="ml-auto">
              <PromptInputSubmit
                className="size-10 rounded-xl"
                onStop={onStop}
                status={status}
              />
            </div>
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatInput;
