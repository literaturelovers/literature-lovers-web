"use client";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
            }
        },
        defaultVariants: {
            variant: "warning",
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
}

export const Banner = ({
    label,
    variant,
}: BannerProps) => {
    const [ hide, setHide ] = useState(false)
    const handleClick = () => {
        setHide(true)
    }

    const Icon = iconMap[variant || "warning"];
    return  (
        hide ? null :  (
            <div className={cn("flex items-center justify-between", bannerVariants({variant}))} role="status">
                <div className="flex">
                    <Icon
                        className="h-4 w-4 mr-2"
                    />
                    {label}
                </div>
                <Button onClick={handleClick} variant="ghost" size="sm" className="underline underline-offset-2" aria-label="Hide notification banner">
                    Hide
                </Button>
            </div>
        )
    )
}