/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_INFLECTIV_API_KEY: string;
  readonly VITE_INFLECTIV_BASE_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
