// Astro's form typings omit the standard rel attribute used for new-tab forms.
// https://html.spec.whatwg.org/multipage/forms.html#attr-form-rel
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    rel?: string | null;
  }
}
