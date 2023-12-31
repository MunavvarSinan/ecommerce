"use client";

import { toast, ToastBar, Toaster as ToasterProvider } from "react-hot-toast";
import { Button } from "@repo/ui/components/ui/button";

/** @see https://react-hot-toast.com */
export const ReactHotToast = () => (
    <ToasterProvider
        containerClassName=""
        containerStyle={{}}
        gutter={8}
        position="bottom-right"
        reverseOrder
        toastOptions={{
            className: "",
            duration: 3500,
            style: {
                borderRadius: "18px",
                padding: "16px 24px",
                border: "1px solid #3f3f3f",
                background: "black",
                color: "white",
            },
            success: {
                duration: 3000,
                style: {
                    background: "green",
                },
            },
            error: {
                duration: 8000,
            },
        }}
    >
        {(t) => (
            <ToastBar style={{ padding: 0, ...t.style }} toast={t}>
                {({ icon, message }) => (
                    <>
                        {icon}
                        {message}
                        {t.type !== "loading" && (
                            <Button
                                autoFocus
                                className="flex items-center justify-center dark:bg-zinc-800 dark:text-zinc-200 bg-zinc-200 text-zinc-800"
                                onClick={() => toast.dismiss(t.id)}
                                size="sm"
                                variant="default"
                            >
                                X
                            </Button>
                        )}
                    </>
                )}
            </ToastBar>
        )}
    </ToasterProvider>
);
