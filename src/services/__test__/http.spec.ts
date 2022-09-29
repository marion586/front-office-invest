import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { Http } from '../http';

describe('instance Http', () => {
    it('should return Http instance', () => {
        const httpInstance: Http = new Http();
        expect(httpInstance instanceof Http).toBe(true);
    });
});

describe('test static method', () => {
    class TestClass {
        public get() {
            return Http.get('test');
        }

        public post() {
            return Http.post('test');
        }
    }

    let ins: TestClass;
    let mockStaticMethod = vitest.fn();

    beforeEach(() => {
        Http.get = mockStaticMethod;
        Http.post = mockStaticMethod;
        ins = new TestClass();
    });

    it('should mock static method with param', () => {
        const expectedValue = 'mock static method value';
        mockStaticMethod.mockReturnValue(expectedValue);

        const getResult = ins.get();
        const postResult = ins.post();

        expect(getResult).toEqual(expectedValue);
        expect(postResult).toEqual(expectedValue);

        expect(mockStaticMethod).toHaveBeenCalledWith('test');
    });
});
