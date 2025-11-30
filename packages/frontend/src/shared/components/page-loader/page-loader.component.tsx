import { CenteredLayout } from "@/shared";
import { Loader2 } from "lucide-react";

export const PageLoader = () => {
    return (
        <CenteredLayout>
            <Loader2 className="w-16 h-16 text-white animate-spin" />
        </CenteredLayout>
    );
};
