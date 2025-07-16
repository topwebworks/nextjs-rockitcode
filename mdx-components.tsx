import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React, { ReactNode } from "react";
import { createHighlighter, Highlighter } from "shiki";
import theme from "./src/app/syntax-theme.json";
import { YouTubeEmbed } from "./src/components/rockitcode/youtube-embed";
import { HTMLPlayground } from "./src/components/rockitcode/html-playground";
import { ImageLightbox } from "./src/components/image-lightbox";
import { InteractiveLessonLauncher } from "./src/components/mdx/InteractiveLessonLauncher";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (typeof node === "object" && "props" in node) {
    return getTextContent(
      (node as { props: { children: ReactNode } }).props.children,
    );
  }

  return "";
}

function generateId(text: string) {
  const id = text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  
  // Return a fallback if the ID is empty
  return id || "heading";
}

let highlighter: Highlighter | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: ["javascript", "css", "html", "typescript"],
      themes: [theme],
    });
  }
  return highlighter;
}

async function CodeBlock({ code, lang }: { code: string; lang: string }) {
  let out = (await getHighlighter()).codeToHtml(code, {
    lang,
    theme: theme.name,
    transformers: [
      transformerColorizedBrackets({
        themes: {
          "Tailwind CSS": [
            "var(--color-purple-200)",
            "var(--color-cyan-300)",
            "var(--color-blue-300)",
            "var(--color-emerald-300)",
            "var(--color-pink-300)",
            "var(--color-amber-200)",
          ],
        },
      }),
    ],
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}

const IMAGE_DIMENSION_REGEX = /^[^|]+\|\d+x\d+$/;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h3 id={id}>{children}</h3>;
    },
    h4: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h4 id={id}>{children}</h4>;
    },
    img: ({ alt, ...props }) => {
      let schemePlaceholder = "{scheme}";
      let urlEncodedPlaceholder = "%7Bscheme%7D";
      let width, height;
      
      if (IMAGE_DIMENSION_REGEX.test(alt)) {
        [width, height] = alt.split("|")[1].split("x").map(Number);
        alt = alt.split("|")[0];
      }
      
      // Handle both encoded and unencoded scheme placeholders
      let src = props.src;
      if (src && src.includes(urlEncodedPlaceholder)) {
        src = src.replace(urlEncodedPlaceholder, schemePlaceholder);
      }
      
      if (src && src.includes(schemePlaceholder)) {
        const lightSrc = src.replace(schemePlaceholder, "light");
        const darkSrc = src.replace(schemePlaceholder, "dark");
        
        return (
          <>
            <ImageLightbox
              src={lightSrc}
              alt={alt}
              width={width}
              height={height}
              className="border border-gray-950/10 dark:border-white/10 dark:hidden"
            />
            <ImageLightbox
              src={darkSrc}
              alt={alt}
              width={width}
              height={height}
              className="border border-gray-950/10 dark:border-white/10 hidden dark:block"
            />
          </>
        );
      } else {
        return (
          <Image 
            {...props} 
            alt={alt} 
            width={width} 
            height={height}
            unoptimized={props.src?.endsWith('.svg')} // Don't optimize SVGs
          />
        );
      }
    },
    async pre(props) {
      let child = React.Children.only(props.children);
      if (!child) return null;
      let { children: code, className } = child.props;
      let lang = className ? className.replace("language-", "") : "";

      return <CodeBlock code={code} lang={lang} />;
    },
    YouTubeEmbed,
    HTMLPlayground,
    InteractiveLessonLauncher,
    ...components,
  };
}
