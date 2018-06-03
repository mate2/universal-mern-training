import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';

class BooksForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount = () => {
        // GET IMAGES FROM API
        axios.get('/api/images')
            .then((response) => {
                this.setState({images: response.data})
            })
            .catch((err) => {
                this.setState({images: 'Error loading image files from the server'})
            });
        this.props.getBooks();
    }
    

    onDelete() {
        const bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value,
        }];
        this.props.postBooks(book);
    }

    handleSelect(img) {
        this.setState({img: '/images/' + img});
    }

    resetForm() {
        // RESET BUTTON
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        this.setState({img: ''});
        findDOMNode(this.refs.price).value = '';
    }

    render() {
        const booksList = this.props.books.map((booksArr) => {
            return (
                <option key={booksArr._id} value={booksArr._id}> {booksArr._id} : {booksArr.title}</option>
            )
        });

        const imgList = this.state.images.map((imgArr, i) => {
            return(
                <MenuItem key={i} eventKey={imgArr.name} onClick={ () => { this.handleSelect(imgArr.name) }}>{imgArr.name}</MenuItem>
            );
        });
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary"
                                >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
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
                                <Button 
                                    bsStyle={(!this.props.style)? ("primary") : (this.props.style)}
                                    onClick={(!this.props.msg) ? (this.handleSubmit) : (this.resetForm)}
                                >
                                    {(!this.props.msg) ? ("Save Book") : (this.props.msg)}
                                </Button>
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
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks,
        getBooks,
        resetButton
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
