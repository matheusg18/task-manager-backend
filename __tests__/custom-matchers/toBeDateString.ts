expect.extend({
  toBeDateString(received: string) {
    const pass = !Number.isNaN(Date.parse(received));

    if (pass) {
      return {
        pass: true,
        message: () => `expected "${received}" not to be a date string`,
      };
    }

    return {
      pass: false,
      message: () => `expected "${received}" to be a date string`,
    };
  },
});
