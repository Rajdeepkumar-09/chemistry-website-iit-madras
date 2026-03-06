import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
    ({ text = "Button", className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-full border-2 border-[#b45309] bg-white px-7 py-3 text-center font-bold text-[#b45309] transition-all duration-500 hover:shadow-xl hover:shadow-[#b45309]/20",
                    className
                )}
                {...props}
            >
                {/* Default text — slides out on hover */}
                <span className="relative z-10 inline-block transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[150%] group-hover:opacity-0">
                    {text}
                </span>

                {/* Hover text + arrow — slides in from left on hover */}
                <div className="absolute inset-0 z-10 flex -translate-x-[100%] items-center justify-center gap-2 text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100">
                    <span>{text}</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                </div>

                {/* Expanding circle background fill */}
                <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 scale-0 rounded-full bg-[#b45309] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[20]"></div>
            </button>
        );
    }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
