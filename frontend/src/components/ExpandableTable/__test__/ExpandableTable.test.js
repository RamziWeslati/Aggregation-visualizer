import React from 'react';
import ReactDom from 'react-dom';

import { render, fireEvent } from '@testing-library/react';
import * as renderer from 'react-test-renderer';

import ExpandableTable from './../ExpandableTable';

const row1 = {'c11': 'v11', 'c12': 'v12', 'c13': 'v13'}
const row2 = {'c21': 'v21', 'c22': 'v22', 'c23': 'v23'}

const expandedRow1 = {'ec11': 'ev11', 'ec12': 'ev12', 'ec13': 'ev13'}
const expandedRow2 = {'ec21': 'ev21', 'ec22': 'ev22', 'ec23': 'ev23'}
const expandedRows = [expandedRow1, expandedRow2]

const mockExpand = () => jest.fn().mockResolvedValue({data: expandedRows})

const RequiredProps = {
    data: [row1, row2],
    onExpand: jest.fn(),
}

const optionalProps = {
    headers: ['Column Name 1', 'Column Name 2', 'Column Name 3']
}

const props = {...optionalProps, ...RequiredProps}

// cleanup is automated

// uts
// SimpleTable uts
it('renders without crashing, only required props', () => {
    const div = document.createElement('div')
    ReactDom.render(<ExpandableTable {...RequiredProps} />, div)
})

it('renders without crashing, full props', () => {
    const div = document.createElement('div')
    ReactDom.render(<ExpandableTable {...props} />, div)
})

it(`renders ${props.data.length} rows`, () => {
    const { getAllByTestId } = render(<ExpandableTable {...props} />)
    expect(getAllByTestId('row')).toHaveLength(props.data.length)
})

it(`renders ${props.data.length + 2} row role`, () => { // header and data rows
    const { getAllByRole } = render(<ExpandableTable {...props} />)
    expect(getAllByRole('row')).toHaveLength(props.data.length + 2)  // + 1 for header row
})

it(`renders a header when header is passed`, () => {
    const { getByTestId } = render(<ExpandableTable {...props} />)
    expect(getByTestId('header')).not.toBeNull()
})

it(`renders an infered header when header is not passed`, () => {
    const { getByTestId } = render(<ExpandableTable {...RequiredProps} />)
    expect(getByTestId('header')).not.toBeNull()
})

// Expand uts
it('calls onExpand when value cell is clicked', () => {
    const _props = {...props, onExpand: mockExpand()}
    const { getByText } = render(<ExpandableTable {..._props} />)
    const cell = getByText(Object.values(row1)[0])
    fireEvent.click(cell)
    expect(_props.onExpand).toBeCalledTimes(1)
})


// it('renders a nested Table within the table when row is clicked', () => {
//     const _props = {...props, onExpand: mockExpand()}
//     const { getAllByTestId, getByText } = render(<ExpandableTable {..._props} />)
//     const cell = getByText(Object.values(row1)[0])
//     fireEvent.click(cell)
//     expect(getAllByTestId('row')).toHaveLength(props.data.length + expandedRows.length)
// })


// snapshots
// un-expanded table snapshots

        //TODO, refactor this into removing UUIDs from snapshot comparaison

/*
 it('matches infered header snapshot, unextended', () => {
     const tree = renderer.create(<ExpandableTable {...RequiredProps} />).toJSON();
     expect(tree).toMatchSnapshot();
 })

it('matches custom header snapshot, unextended', () => {
    const tree = renderer.create(<ExpandableTable {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
})

 expanded table snapshots

 it('matches nested table snapshot, extended', () => {
     const _props = {...props, onExpand: mockExpand()}
     const {getByText, asFragment} = render(<ExpandableTable {..._props} />);
     const cell = getByText(Object.values(row1)[0])
     fireEvent.click(cell)
     expect(asFragment()).toMatchSnapshot();
 })
 */