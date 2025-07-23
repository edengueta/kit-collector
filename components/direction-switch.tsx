"use client";

import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

// Custom icons for RTL/LTR
const LTRIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H14M4 18H8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const RTLIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6H4M20 12H10M20 18H16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export interface DirectionSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const DirectionSwitch: FC<DirectionSwitchProps> = ({
  className,
  classNames,
}) => {
  // We'll use localStorage to persist the direction preference
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const isSSR = useIsSSR();

  // Initialize direction from localStorage on component mount
  useEffect(() => {
    const savedDirection = localStorage.getItem("direction") as
      | "ltr"
      | "rtl"
      | null;

    if (savedDirection) {
      setDirection(savedDirection);
      document.documentElement.dir = savedDirection;
    }
  }, []);

  const onChange = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";

    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    localStorage.setItem("direction", newDirection);
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: direction === "ltr" || isSSR,
    "aria-label": `Switch to ${direction === "ltr" || isSSR ? "RTL" : "LTR"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? <LTRIcon size={22} /> : <RTLIcon size={22} />}
      </div>
    </Component>
  );
};
