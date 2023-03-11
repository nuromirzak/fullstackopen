# Tests need to be fixed

## If tests run with command `npm test -- -t "test name"`, they prints this warning:

```
  ●  Cannot log after tests are done. Did you forget to wait for something async in your test?
    Attempted to log "connected to MongoDB".

      24 |   .connect(config.MONGODB_URI, config.mongoose_config)
      25 |   .then(() => {
    > 26 |     console.log("connected to MongoDB");
         |             ^
      27 |   })
      28 |   .catch((error) => {
      29 |     console.log("error connecting to MongoDB:", error);

      at console.log (node_modules/@jest/console/build/BufferedConsole.js:156:10)
      at log (app.js:26:13)
```

## If tests run individually, they pass, but if they run together (`npm test`), they fail

- I think it is because of the concurrent nature of the tests, but I don't know how to fix it