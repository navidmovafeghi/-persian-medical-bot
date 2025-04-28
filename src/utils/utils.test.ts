import { cn } from './utils';

describe('cn function', () => {
  test('should merge class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  test('should handle conditional classes', () => {
    const result = cn('base', true && 'included', false && 'excluded');
    expect(result).toBe('base included');
    expect(result).not.toContain('excluded');
  });

  test('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toBe('base valid');
  });

  test('should handle multiple conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    
    const result = cn(
      'base',
      isActive ? 'active' : 'inactive',
      isDisabled && 'disabled'
    );
    
    expect(result).toBe('base active');
    expect(result).not.toContain('inactive');
    expect(result).not.toContain('disabled');
  });
}); 