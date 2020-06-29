import React from 'react';
import Clock from "../../components/Clock"; 
import renderer from "react-test-renderer";

var clockRenderer = null;
describe('<Clock />', () => {
    describe('should properly when fiven minutes and seconds', () => {
        beforeEach(() => {
            clockRenderer = renderer.create(<Clock minutes={10} seconds={20} />)
        });
        it('renders properly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        })
        it('renders an h2 element', () => {
            expect(clockRenderer.toJSON().type).toEqual('h2')
        });
        it('sets a Clock className', () => {
            expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching(/clock/)})
        });
        it('renders minutes properly', () => {
            expect(clockRenderer.toJSON().children[2].children).toEqual(expect.arrayContaining(['10']))
        });
        it('renders seconds properly', () => {
            expect(clockRenderer.toJSON().children[4].children).toEqual(expect.arrayContaining(['20']))
        });
    });
});