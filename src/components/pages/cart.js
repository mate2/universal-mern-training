import React from 'react';
import {connect} from 'react-redux';
import {Modal, Col, Panel, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';

import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }

    handleOpen() {
        this.setState({show: true});
    }

    handleClose() {
        this.setState({show: false});
    }

    onDelete(_id) {
        // Create a copy of the current array of books
        const currentBookToDelete = this.props.cart;
        // Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex((cart) => {
            return cart._id === _id;
        });
        // use slice to remove the book at the specified index
        const cartAfterDelete = [
            ...currentBookToDelete.slice(0, indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)
        ];
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1);
    }
    
    onDecrement(_id, quantity) {
        if(quantity > 1){
            this.props.updateCart(_id, -1);
        }
    }

    renderEmpty() {
        return(<div></div>);
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((cartArr) => {
            return(
                <Panel key={cartArr._id}>
                    <Panel.Body>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>{cartArr.title}</h6><span>    </span>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>usd. {cartArr.price}</h6>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>qty. <Label bsStyle='success'>{cartArr.quantity}</Label></h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{minWidth: '300px'}}>
                                    <Button bsStyle='default' bsSize='small' onClick={() => { this.onDecrement(cartArr._id, cartArr.quantity);}}>-</Button>
                                    <Button bsStyle='default' bsSize='small' onClick={() => { this.onIncrement(cartArr._id);}}>+</Button>
                                    <span>     </span>
                                    <Button bsStyle='danger' bsSize='small' onClick={() => { this.onDelete(cartArr._id);}}>DELETE</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            );
        });
        return (
            <Panel bsStyle='primary'>
                <Panel.Heading>Cart</Panel.Heading>
                <Panel.Body>
                    {cartItemsList}
                    <Row>
                        <Col>
                            <h6>Total amount: {this.props.totalAmount}</h6>
                            <Button bsStyle='success' bsSize='small' onClick={this.handleOpen}>
                                Proceed to checout
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank you !</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Your order has been saved</h6>
                            <p>You will receive an email confirmation</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Col>
                                <h6>total $: {this.props.totalAmount}</h6>
                            </Col>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                        </Modal>
                </Panel.Body>
            </Panel>
        );
    }
    render() {
        if(this.props.cart[0]) {
            return this.renderCart();
        }
        return this.renderEmpty();
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
        totalQty: state.cart.totalQty,
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem,
        updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
