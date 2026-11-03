import { defineConfig } from 'vitest/config'

// Coverage thresholds from the lab (Vitest does not read the "vitest" key of package.json)
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/index.js'],
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80
      }
    }
  }
})
