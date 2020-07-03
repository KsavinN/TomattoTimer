import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import EditableTimeBox from "../../components/EditableTimeBox";

describe('<EditableTimeBox />', () => {
    afterEach(cleanup)
    it('show edit button', () => {
        const { getByText } = render(<EditableTimeBox />);
        expect(() => getByText("Edytuj")).not.toThrow();
    });
    it('allows edititing the timebox', () => {
        const { getByText,getByTestId } = render(<EditableTimeBox />);

        fireEvent.click(getByText("Edytuj"));

        fireEvent.change(getByTestId("task_input"),{ target: {value: 'Changed :)'} });
        
        fireEvent.click(getByText(/zmiany/));

        expect(() => getByText("Changed :)")).not.toThrow();
        
    });
})