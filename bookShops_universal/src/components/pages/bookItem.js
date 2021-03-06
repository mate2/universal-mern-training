import React from 'react';
import {Image, Well, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component {
    constructor(props){
        super(props);
        this.handleCart = this.handleCart.bind(this);
        this.onReadMore = this.onReadMore.bind(this);

        this.state = {
            isClicked: false
        };
    }

    onReadMore() {
        this.setState({isClicked: true});
    }

    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }];

        // CHECK IF CART IS EMPTY
        if(this.props.cart.length > 0){
            // CART IS NOT EMPTY
            const _id = this.props._id;
            const CartIndex = this.props.cart.findIndex((cart) => {
                return cart._id === _id;
            })
            // if returns -1 there are no items with same _id
            if( CartIndex === -1){
                this.props.addToCart(book);
            }else{
                //We need to update quantity
                this.props.updateCart(_id, 1, this.props.cart);
            }
        }else{
            // CART IS EMPTY
            this.props.addToCart(book);
        }

    }

    render() {
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={12} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length > 50 && this.state.isClicked === false) ? (this.props.description.substring(0,50)) : (this.props.description)}
                            <button className='link' onClick={this.onReadMore}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50) ? ('...read more') : ('')}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button bsStyle='primary' onClick={this.handleCart}>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
