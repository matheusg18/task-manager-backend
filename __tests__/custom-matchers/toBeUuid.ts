expect.extend({
  toBeUuid(received: string) {
    const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    const pass = uuidRegex.test(received);

    if (pass) {
      return {
        pass: true,
        message: () => `expected "${received}" not to be a uuid`,
      };
    }

    return {
      pass: false,
      message: () => `expected "${received}" to be a uuid`,
    };
  },
});
