import { useState } from "react";
import "./index.module.css";
import { useQuery } from "@tanstack/react-query";

const ABORT_TIMEOUT = 1000; // ms
const PAGE_SIZE = 5;

type Post = {
  id: number;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const FetchTanStack = () => {
  const [page, setPage] = useState(1);

  /**
   * FIXME: unmount時に自動でabortされない
   * https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation
   */
  const {
    data: posts,
    error,
    isFetching: isLoading,
    failureCount,
  } = useQuery({
    initialData: [],
    queryKey: ["posts", page],
    queryFn: async () => {
      try {
        // 時間が経ったらリクエストを中止させる
        const res = await fetch(
          `https://dummyjson.com/posts?limit=${PAGE_SIZE}&page=${page}`,
          { signal: AbortSignal.timeout(ABORT_TIMEOUT) },
        );

        await wait(ABORT_TIMEOUT * 2);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json().then((data) => data.posts) as Promise<Post[]>;
      } catch (err) {
        console.log(err);
      }
    },
    retry: 1,
  });

  // リクエストが中止されたかどうか
  const isAborted = error instanceof Error && error.name === "TimeoutError";

  // エラーメッセージ
  const errorMessage = !(error instanceof Error)
    ? "An unknown error occurred."
    : error.message.startsWith("HTTP")
      ? "Server error."
      : isAborted
        ? ""
        : "Network error.";

  // リトライ中かどうか
  const isRetrying = failureCount > 0 && isLoading;

  return (
    <div>
      <h1>Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : isAborted ? (
        <p style={{ color: "orange" }}>Request was aborted.</p>
      ) : (
        <p>Data loaded.</p>
      )}
      {isRetrying ? <p style={{ color: "blue" }}>Retrying...</p> : null}
      <ul>
        {(posts || []).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1 || isLoading}
      >
        Prev
      </button>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={isLoading}>
        Next
      </button>
    </div>
  );
};
