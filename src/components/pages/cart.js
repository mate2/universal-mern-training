import React from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';

import {deleteCartItem} from '../../actions/cartActions';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
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
                                <h6>qty. <Label bsStyle='success'>1</Label></h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{minWidth: '300px'}}>
                                    <Button bsStyle='default' bsSize='small'>-</Button>
                                    <Button bsStyle='default' bsSize='small'>+</Button>
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
        cart: state.cart.cart
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteCartItem}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);