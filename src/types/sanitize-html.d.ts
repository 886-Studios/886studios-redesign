declare module "sanitize-html" {
  interface SanitizeHtmlFrame {
    tag: string;
    attribs: Record<string, string>;
    text: string;
  }

  interface TransformResult {
    tagName: string;
    attribs: Record<string, string>;
  }

  interface SanitizeHtmlOptions {
    allowedTags?: string[] | false;
    allowedAttributes?: Record<string, string[]> | false;
    allowedClasses?: Record<string, string[]>;
    allowedSchemes?: string[];
    allowedSchemesByTag?: Record<string, string[]>;
    allowProtocolRelative?: boolean;
    enforceHtmlBoundary?: boolean;
    nonTextTags?: string[];
    exclusiveFilter?: (frame: SanitizeHtmlFrame) => boolean;
    transformTags?: Record<
      string,
      string | ((tagName: string, attribs: Record<string, string>) => TransformResult)
    >;
  }

  export default function sanitizeHtml(
    dirty: string,
    options?: SanitizeHtmlOptions,
  ): string;
}
