import React from 'react';
import ReactDom from 'react-dom';

import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';

import Table from './../Table';

const row1 = {'c11': 'v11', 'c12': 'v12', 'c13': 'v13'}
const row2 = {'c21': 'v21', 'c22': 'v22', 'c23': 'v23'}

const RequiredProps = {
    data: [row1, row2]
}

const optionalProps = {
    headers: ['Column Name 1', 'Column Name 2', 'Column Name 3']
}

const props = {...optionalProps, ...RequiredProps}

// cleanup is automated

// uts
it('renders without crashing, only required props', () => {
    const div = document.createElement('div')
    ReactDom.render(<Table {...RequiredProps} />, div)
})

it('renders without crashing, full props', () => {
    const div = document.createElement('div')
    ReactDom.render(<Table {...props} />, div)
})

it(`renders ${props.data.length} rows`, () => {
    const tree = render(<Table {...props} />)
    expect(tree.getAllByTestId('row')).toHaveLength(props.data.length)
})

it(`renders ${props.data.length + 1} row role`, () => { // header and data rows
    const tree = render(<Table {...props} />)
    expect(tree.getAllByRole('row')).toHaveLength(props.data.length + 1)  // + 1 for header row
})

it(`renders a header when header is passed`, () => {
    const tree = render(<Table {...props} />)
    expect(tree.getByTestId('header')).not.toBeNull()
})

it(`renders an infered header when header is not passed`, () => {
    const tree = render(<Table {...RequiredProps} />)
    expect(tree.getByTestId('header')).not.toBeNull()
})


// snapshots
it('matches infered header snapshot', () => {
    const tree = renderer.create(<Table {...RequiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches custom header snapshot', () => {
    const tree = renderer.create(<Table {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
})
