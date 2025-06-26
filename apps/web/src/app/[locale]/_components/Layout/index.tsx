"use client";
import { LoadingOverlay } from "@achmadk/react-loading-overlay/nextjs";
import { useClerk, useUser } from "@clerk/nextjs";
import { Menu, MenuButton, MenuDivider, MenuItem } from "@szhsin/react-menu";
import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { useEffect } from "react";
import Spacer from "react-spacer";
import useShowWindowSize from "use-show-window-size";
import { useBoolean } from "usehooks-ts";
import { Link } from "@/i18n/navigation";
import styles from "./style.module.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  const { isLoaded, isSignedIn, user } = useUser();
  const { setTrue: onSpinner, value: spinner } = useBoolean(false);
  const { signOut } = useClerk();

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  useEffect(() => onSpinner(), [onSpinner]);

  return (
    <LoadingOverlay
      active={!isLoaded}
      className={styles.loadingOverlay}
      spinner={spinner}
    >
      <div className={styles.container}>
        {isSignedIn ? (
          <>
            <header className={styles.header}>
              <Link
                className={clsx(spaceGrotesk.className, styles.title)}
                href="/"
              >
                PocketCMS
              </Link>
              <Spacer grow={1} />
              <Menu
                menuButton={
                  <MenuButton className={styles.userImageButton}>
                    <Image
                      alt={user.username ?? ""}
                      fill={true}
                      src={user.imageUrl}
                    />
                  </MenuButton>
                }
                align="end"
                className={styles.myMenu}
                gap={3}
                transition={true}
              >
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => void signOut()}>サインアウト</MenuItem>
              </Menu>
            </header>
            <main>{children}</main>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </LoadingOverlay>
  );
}
