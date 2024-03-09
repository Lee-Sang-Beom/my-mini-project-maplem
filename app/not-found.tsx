import Link from "next/link";
export default async function NotFound() {
  return (
    <div>
      <p
        style={{
          marginBottom: "15px",
        }}
      >
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        style={{
          border: "1px solid #dbdbdb",
          padding: "10px",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
