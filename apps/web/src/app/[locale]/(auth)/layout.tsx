import { type ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return <>{children}</>;
}
