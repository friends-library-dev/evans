import { audioDurationStr } from '../helpers';

describe(`audioDurationStr()`, () => {
  it(`returns human formatted string of duration`, () => {
    const duration = audioDurationStr([60, 60, 60, 5.2]);
    expect(duration).toBe(`3:05`);
  });

  const cases: [number[], string][] = [
    [[60 * 60 * 3], `3:00:00`],
    [[60 * 60 * 3, 60 * 5, 5], `3:05:05`],
    [[60 * 60 * 5, 60 * 19, 43], `5:19:43`],
    [[3318], `55:18`],
    [[3203], `53:23`],
    [[1815, 1807, 1834, 1691, 2573], `2:42:00`],
    [[3], `3`],
  ];

  test.each(cases)(`%s should convert to %s`, (secondses, expected) => {
    const duration = audioDurationStr(secondses);
    expect(duration).toBe(expected);
  });
});
