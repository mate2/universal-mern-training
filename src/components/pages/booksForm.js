import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postBooks, deleteBooks} from '../../actions/booksActions';

class BooksForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }];
        this.props.postBooks(book);
    }

    render() {
        const booksList = this.props.boos.map((booksArr) => {
            return (
                <option key={booksArr._id} value={booksArr._id}> {booksArr._id} : {booksArr.title}</option>
            )
        });

        return(
            <Well>
                <Panel>
                    <Panel.Body>
                        <FormGroup controlId='title'>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Title'
                                ref='title'
                            />
                        </FormGroup>
                        <FormGroup controlId='description'>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Description'
                                ref='description'
                            />
                        </FormGroup>
                        <FormGroup controlId='price'>
                            <ControlLabel>Price</ControlLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Price'
                                ref='price'
                            />
                        </FormGroup>
                        <Button bsStyle='primary' onClick={this.handleSubmit}>Save</Button>
                    </Panel.Body>
                </Panel>
                <Panel style={{marginTop: '25px'}}>
                    <Panel.Body>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select a book to delete</ControlLabel>
                            <FormControl ref='delete' componentClass="select" placeholder="select">
                                <option value="select">select</option>
                                {booksList}
                            </FormControl>
                        </FormGroup>
                        <Button bsStyle='danger' onClick={this.onDelete}>Delete</Button>
                    </Panel.Body>
                </Panel>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        boos: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
