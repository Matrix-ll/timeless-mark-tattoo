// fig-tagger jsx-runtime: pure passthrough. Production JSX compiles to jsx/jsxs;
// re-exporting React's runtime keeps builds byte-equivalent with zero overhead
// if a bundler ever resolves the prod runtime through the fig-tagger alias.
export * from 'react/jsx-runtime';
