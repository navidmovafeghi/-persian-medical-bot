import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render function that wraps the component with any providers needed
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, {
      // Wrap provider(s) here if needed
      wrapper: ({ children }) => children,
      ...options,
    }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { screen };

// Override render method with our custom version
export { customRender as render };
