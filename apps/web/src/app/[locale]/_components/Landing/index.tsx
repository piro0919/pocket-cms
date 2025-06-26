import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";
import { Link } from "@/i18n/navigation";
import styles from "./style.module.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function Landing(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textsContainer}>
          <h1 className={clsx(spaceGrotesk.className, styles.h1)}>PocketCMS</h1>
          <div className={styles.catchCopy}>NO SIMPLE, NO COMFORTABLE.</div>
        </div>
        <div className={styles.linksContainer}>
          <Link className={styles.link} href="/sign-up">
            サインアップ
          </Link>
          <Link className={styles.link} href="/sign-in">
            サインイン
          </Link>
        </div>
      </div>
    </div>
  );
}
