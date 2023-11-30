import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const roboto = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
