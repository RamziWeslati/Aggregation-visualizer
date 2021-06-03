import React from 'react';
import ReactDom from 'react-dom';

import { render, fireEvent } from '@testing-library/react';
import * as renderer from 'react-test-renderer';

import ActionableSelect from './../ActionableSelect';

const props = {
    data: ['option1', 'option2', 'option3'],
    action: jest.fn(),
    placeholder: 'placeholder text',
}

// cleanup is automated

// uts
it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<ActionableSelect {...props} />, div)
})

it('renders placeholder on mount', () => {
    const { getByTestId } = render(<ActionableSelect {...props} />)
    expect(getByTestId('act-select')).toHaveTextContent('placeholder text')
})

it('does not render a cancel button on mount', () => {
    const { queryByTestId  } = render(<ActionableSelect {...props} />)
    expect(queryByTestId('cancel')).toBeNull();
})

it(`renders ${props.data.length} options on select click`, () => {
    const tree = render(<ActionableSelect {...props} />)
    const select = tree.getByTestId('select')
    fireEvent.click(select)
    expect(tree.getAllByRole('option')).toHaveLength(props.data.length + 1) // +1 for the placeholder disabled option
})


// snapshots
it('matches snapshot', () => {
    const tree = renderer.create(<ActionableSelect {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
})
