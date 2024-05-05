"use client";

import { Fragment, useRef } from "react";
import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import { SlBubbles, SlHome, SlMagnifier, SlPlus, SlUser } from "react-icons/sl";

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(180, 4, 3)"
      />
    </svg>
  );
}

function MobileNavigation(props: React.ComponentPropsWithoutRef<typeof Popover>) {
  return (
    <Popover {...props}>
      <Popover.Button className="fixed bottom-4 right-4 z-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        <ChevronUpIcon className="h-5 w-5 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-1 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed bottom-16 right-4 z-5 w-fit origin-bottom rounded-lg bg-white p-4 shadow-lg ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <nav className="mt-3">
              <ul className="text-center -my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/messages">Messages</NavItem>
                <NavItem href="/create">Create</NavItem>
                <NavItem href="/profile">Profile </NavItem>
                <NavItem href="/explore">Explore</NavItem>
                {/* <NavItem href='/messages'>Messages</NavItem> */}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={`relative block px-3 py-2 transition ${
          isActive
            ? "text-primary/90 dark:text-primary/80"
            : "hover:text-primary/70 transition ease-out dark:hover:text-primary/40"
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/80 via-primary/10 to-primary/60 dark:from-primary/60 dark:via-primary/40 dark:to-primary/90" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="border border-primary/40 dark:border-primary/30 flex rounded pl-12 pr-12 bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/">
          <SlHome className="size-8 mt-2 mb-2" />
        </NavItem>
        <NavItem href="/explore">
          <SlMagnifier className="size-8 mt-2 mb-2" />
        </NavItem>
        <NavItem href="/create">
          <SlPlus className="size-8 mt-2 mb-2" />
        </NavItem>
        <NavItem href="/messages">
          <SlBubbles className="size-8 mt-2 mb-2" />
        </NavItem>
        <NavItem href="/profile">
          <SlUser className="size-8 mt-2 mb-2" />
        </NavItem>
      </ul>
    </nav>
  );
}

export function Navbar() {
  const isHomePage = usePathname() === "/";

  const headerRef = useRef<React.ElementRef<"div">>(null);
  const avatarRef = useRef<React.ElementRef<"div">>(null);

  return (
    <>
      <header
        className=" md:w-full md:justify-center pointer-events-none relative sm:z-20 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div ref={avatarRef} className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position: "var(--header-position)" as React.CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position: "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
              ></div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-5 h-16 pt-6"
          style={{
            position: "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position: "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1 md:justify-center ">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div className="flex-none" style={{ height: "var(--content-offset)" }} />}
    </>
  );
}

const ContainerOuter = forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={`sm:px-8 ${className ?? ""}`} {...otherProps}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});
ContainerOuter.displayName = "ContainerOuter"; // Setting display name

const ContainerInner = forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  return (
    <div ref={ref} className={`relative px-4 sm:px-8 lg:px-12 ${className ?? ""}`} {...otherProps}>
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});
ContainerInner.displayName = "ContainerInner"; // Setting display name

const Container = forwardRef<
  React.ElementRef<typeof ContainerOuter>,
  React.ComponentPropsWithoutRef<typeof ContainerOuter>
>((props, ref) => {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{props.children}</ContainerInner>
    </ContainerOuter>
  );
});
Container.displayName = "Container"; // Setting display name

export { Container, ContainerInner, ContainerOuter };
