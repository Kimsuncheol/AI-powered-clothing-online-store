# Header Visibility & Appearance Mode

- Always wrap page content in a themed container so background/text colors follow appearance mode (light/dark/system) even when the header is hidden (e.g., `/auth/signin`, `/auth/signup`).
- Use the current MUI theme (`useTheme`) to set:
  - `bgcolor: theme.palette.background.default`
  - `color: theme.palette.text.primary`
  - `minHeight: '100vh'`
  - Layout: `display: 'flex'`, `flexDirection: 'column'`
- Header hide logic remains: `HIDE_HEADER_ROUTES = ['/auth/signin', '/auth/signup']`. Header is omitted on these routes but the themed background still applies.
- Children render inside a `<Box component="main" sx={{ flex: 1 }}>` within the themed wrapper.

Reference structure:
```tsx
<Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', flexDirection: 'column' }}>
  {!hideHeader && <Header />}
  <Box component="main" sx={{ flex: 1 }}>
    {children}
  </Box>
</Box>
```
