module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      astTransformers: [
        "jest-preset-angular/build/InlineFilesTransformer",
        "jest-preset-angular/build/StripStylesTransformer"
      ],
      allowSyntheticDefaultImports: true
    },
    transform: {
      "^.+\\.(ts|html)$":
        "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
      "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: ["ts", "html", "js", "json"],
    transformIgnorePatterns: ["node_modules/(?!@ngrx)", "^.+\\.js$"]
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>\\setupJest.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/storybook-static/",
    "angularshots.test.js",
    "dist"
  ],
  modulePaths: ["<rootDir>/dist"],
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "cobertura"],
  testMatch: ["<rootDir>/**/*.spec.ts"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./coverage/jest-report.html"
      }
    ],
    [
      "jest-junit",
      {
        suiteName: "jest tests",
        output: "./coverage/test_results.xml",
        classNameTemplate: "{classname}-{title}",
        titleTemplate: "{classname}-{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: "true"
      }
    ]
  ]
};
