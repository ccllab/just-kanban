import { expect } from 'chai';
import { hello } from './helloWorld';
import 'mocha';

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = hello();

        expect(result).to.equal('Hello world!');
    });
});