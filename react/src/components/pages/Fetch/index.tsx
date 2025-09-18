import { useEffect, useState } from "react";
import "./index.module.css";

const ABORT_TIMEOUT = 1000; // ms
const PAGE_SIZE = 5;

type Post = {
  id: number;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Fetch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // ページネーション
  const [page, setPage] = useState(1);
  const [isAborted, setIsAborted] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // リクエスト中止
    let controller: AbortController | undefined;

    // dev環境ではuseEffectが２回走るので、このせいでの予期せぬabortを防ぐ
    let isAbortedByCleanup = false;

    // ページ中止用のtimeout
    let abortTimeout: NodeJS.Timeout;

    // 再帰的にリトライする
    let retryCount = 0;

    const loadPosts = async () => {
      controller = new AbortController();
      console.log("post isLoading", retryCount);

      try {
        // リクエスト中止関連
        setIsAborted(false);
        // ローディング状態
        setIsLoading(true);
        // エラー状態
        setError("");

        abortTimeout = setTimeout(() => {
          controller?.abort();
        }, ABORT_TIMEOUT);

        const res = await fetch(
          `https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`,
          { signal: controller.signal },
        );

        // リクエストを中止させる
        await wait(2 * ABORT_TIMEOUT);

        abortTimeout && clearTimeout(abortTimeout);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.posts);
        setError("");
      } catch (err: unknown) {
        if (!(err instanceof Error)) {
          setError("An unknown error occurred.");
        } else if (err.name === "AbortError") {
          setIsAborted(!isAbortedByCleanup);
        } else if (err.message.startsWith("HTTP")) {
          setError("Server error.");
        } else {
          setError("Network error.");
        }

        // リトライ
        if (retryCount < 1 && !isAbortedByCleanup) {
          retryCount += 1;
          setIsRetrying(true);
          await loadPosts();
        }
      } finally {
        setIsRetrying(false);
        setIsLoading((isLoading) => {
          if (isAbortedByCleanup) return isLoading;
          return false;
        });
      }
    };

    loadPosts();

    // クリーンアップ
    return () => {
      isAbortedByCleanup = true;
      retryCount = 0;
      controller?.abort();
    };
  }, [page]);

  return (
    <div>
      <h1>Posts</h1>
      {isLoading ? (
        <p>isLoading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : isAborted ? (
        <p style={{ color: "orange" }}>Request was aborted.</p>
      ) : (
        <p>Data loaded.</p>
      )}
      {isRetrying ? <p style={{ color: "blue" }}>Retrying...</p> : null}
      <ul>
        {posts.map((p) => (
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
