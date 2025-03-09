import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/header.css" />
        <link rel="stylesheet" href="/css/footer.css" />
        <link rel="stylesheet" href="/css/loading&connect.css" />
        <script src="/js/header&footer.js" defer></script>
        <script src="/js/loading&connect.js" defer></script>
      </Head>
      {children}
    </>
  );
}
