import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const inputValue = 'inputValue';

    expect(resolveValue(inputValue)).resolves.toBe(inputValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'test message';

    try {
      throwError(msg);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(msg);
      }
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Oops!');
      }
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
