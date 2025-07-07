"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { 
  getNavigationSections, 
  type NavigationSection, 
  type NavigationItem 
} from "@/data/navigation";

interface ModularNavigationProps {
  onNavigate?: () => void;
  className?: string;
  sections?: NavigationSection[];
}

function NavigationItemComponent({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = item.url === pathname;
  
  return (
    <li
      key={item.id}
      className={clsx(
        "-ml-px flex border-l border-transparent pl-4",
        "hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white",
        "has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white",
      )}
    >
      <Link
        href={item.url}
        aria-current={isActive ? "page" : undefined}
        onClick={onNavigate}
        className={clsx(
          "flex items-center gap-2 aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white",
          "min-w-0 flex-1"
        )}
      >
        {item.icon && (
          <span className="text-lg shrink-0" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate">{item.title}</div>
          {item.estimatedMinutes && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.estimatedMinutes}min
            </div>
          )}
          {item.isPaid && (
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              PRO
            </div>
          )}
        </div>
        {item.difficulty && (
          <span className={clsx(
            "text-xs px-2 py-1 rounded-full shrink-0",
            item.difficulty === 'beginner' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            item.difficulty === 'intermediate' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            item.difficulty === 'advanced' && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          )}>
            {item.difficulty}
          </span>
        )}
      </Link>
    </li>
  );
}

function NavigationSectionComponent({
  section,
  pathname,
  onNavigate,
}: {
  section: NavigationSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div key={section.id}>
      <h2 className="text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white">
        {section.title}
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {section.description}
      </p>
      <ul className="mt-4 flex flex-col gap-2 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-2 sm:text-sm/6 dark:border-white/10 dark:text-gray-400">
        {section.items.map((item) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </div>
  );
}

export function ModularNavigation({
  onNavigate,
  className,
  sections: customSections,
}: ModularNavigationProps) {
  const pathname = usePathname();
  const sections = customSections || getNavigationSections();

  return (
    <div className={clsx(className, "space-y-8")}>
      {sections.map((section) => (
        <NavigationSectionComponent
          key={section.id}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

// Export for backward compatibility with existing sidebar layout
export function CourseNavigation({
  modules,
  onNavigate,
  className,
}: {
  modules: any[];
  onNavigate?: () => void;
  className?: string;
}) {
  // This is for backward compatibility - it will still work with the old format
  const pathname = usePathname();

  return (
    <div className={clsx(className, "space-y-8")}>
      {modules.map((module: any) => (
        <div key={module.id}>
          <h2 className="text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white">
            {module.title}
          </h2>
          <ul className="mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400">
            {module.lessons.map((lesson: any) => (
              <li
                key={lesson.id}
                className={clsx(
                  "-ml-px flex border-l border-transparent pl-4",
                  "hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white",
                  "has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white",
                )}
              >
                <Link
                  href={`/${lesson.id}`}
                  aria-current={
                    `/${lesson.id}` === pathname ? "page" : undefined
                  }
                  onClick={onNavigate}
                  className="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
