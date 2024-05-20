import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    setupFilesAfterEnv: ['../jest.setup.js'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@application/(.*)$': '<rootDir>/application/$1',
        '^@domain/(.*)$': '<rootDir>/domain/$1',
        '^@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
    },
};

export default config;
