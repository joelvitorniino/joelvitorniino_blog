import { PropsWithChildren } from "react";
import FooterComponent from "./FooterComponent";

export default function LayoutComponent({ children }: PropsWithChildren) {
    return (
        <>
            <main className="min-h-vh">{ children }</main>
            <FooterComponent />
        </>
    )
};