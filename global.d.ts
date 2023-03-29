import type { JSONFile } from 'lowdb/lib/node'

declare module 'lowdb/node' {
  export { JSONFile }
}
