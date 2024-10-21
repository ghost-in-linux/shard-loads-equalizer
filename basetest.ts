import { test as basteTest } from "@playwright/test";
import { recordTestsExecutionTime } from "shard-loads-equalizer";

export const test = basteTest.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({}, use) => {
      await use();
    },
    { auto: true },
  ],
});

// Register the afterEach hook outside of the use function
test.afterEach(async ({}, testInfo) => {
  recordTestsExecutionTime(testInfo);
});
